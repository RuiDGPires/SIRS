#!/bin/env python3
from flask import Flask
from flask import request, redirect, url_for, abort
from functools import wraps
from hashlib import sha256
import jwt
import datetime
import psycopg2
import psycopg2.extras
import logging
import os
import gunicorn.glogging
import pyotp
import json

CWD = os.path.dirname(__file__)


DB_HOST="192.168.0.10"
DB_USER="master" 
DB_DATABASE="sirs"
DB_PASSWORD="sirsebuefixe"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD)
APP_KEY = "PUK6HCM7CXYECEG7TP3C7LWBC3YOHLUV"

app = Flask(__name__)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

handler = logging.FileHandler(f'{CWD}/logs/flask.log')
handler.setLevel(logging.INFO)
handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s:\n %(message)s'))

logger.addHandler(handler)

logger.info("Setup Complete for: " + __name__)


def query(cursor, string, data = ()):
    res = []
    cursor.execute(string, data)
    
    try:
        for row in cursor:
            res.append(row)
    except:
        pass

    return res

def transaction(cursor):
    query(cursor, "START TRANSACTION;")

def commit(cursor):
    query(cursor, "COMMIT;")

def user_exists(id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM users WHERE id=(%s)', (id,))

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return res != []

def is_client(id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM clients WHERE id=(%s)', (id,))

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return res != []

def is_employee(id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM employees WHERE id=(%s)', (id,))

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return res != []

def is_admin(id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM admins WHERE id=(%s)', (id,))

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return res != []

def token_required(f):
    @wraps(f)
    def token_dec(*args, **kwargs):
        token = request.args.get('token')

        if not token:
            return "Missing Token!", 400
        try:
            data = jwt.decode(token, APP_KEY, algorithms=["HS256"])
        except:
            return "Invalid Token", 400
        
        id       = data["id"]
        if not user_exists(id):
            return "Invalid Token", 400

        return f(id=id, *args, **kwargs)
    return token_dec

def admin_required(f):
    @wraps(f)
    def admin_dec(*args, **kwargs):
        id = kwargs["id"]

        if not is_admin(id):
            return "No permission", 400

        return f(*args, **kwargs)
    return admin_dec

@app.route("/")
def index():
    logger.info("Ok")
    return "ok", 200

def get_name(id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if is_client(id):
        table = "clients"
    elif is_employee(id):
        table = "employees"
    elif is_admin(id):
        table = "admins"

    try:
        res = query(cursor, f'SELECT (name) FROM users NATURAL JOIN {table} WHERE id=(%s)', (id,)) 
        info = res[0]
    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400


    cursor.close()
    dbConn.close()
    return info[0]

def get_user(id, name, table):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    try:
        res = query(cursor, f'SELECT id, secret, name, first_name, last_name, email FROM users NATURAL JOIN {table} WHERE name=(%s)', (name,)) 
        info = res[0]
    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400


    user = {"id": info[0],
            "secret": info[1],
            "username": info[2],
            "first_name": info[3],
            "last_name": info[4],
            "email": info[5]
            }

    cursor.close()
    dbConn.close()
    return json.dumps(user), 200

@app.route("/bicicles/list/<n>", methods=["GET"])
@token_required
def get_n_bicicles(id, n):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    try:
        if is_employee(id):
            res = query(cursor, 'SELECT id, latitude, longitude, rightly_parked FROM bikes')
        else:
            res = query(cursor, 'SELECT id, latitude, longitude, rightly_parked FROM bikes WHERE rightly_parked=true')

        bikes = []
        count = 0
        for bike in res:
            if count >= int(n):
                break

            is_locked = [] != query(cursor, 'SELECT * FROM locked_bikes WHERE id=(%s)', (bike[0],)) 

            if is_employee(id):
                bikes.append({"id": bike[0], "latitude": bike[1], "longitude": bike[2], "rightly_parked": bike[3], "locked": is_locked})
            else:
                bikes.append({"id": bike[0], "latitude": bike[1], "longitude": bike[2], "locked": is_locked})
            count += 1
    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400



    cursor.close()
    dbConn.close()
    return json.dumps(bikes), 200

@app.route("/bicicles/list", methods=["GET"])
@token_required
def get_bicicles(id):
    return get_n_bicicles(n=10)

@app.route("/bicicles/<n>/update", methods=["PUT"])
@token_required
def update_bicile(id, n):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    transaction(cursor)

    try:
        if [] == query(cursor, 'SELECT * FROM locked_bikes WHERE locked_by=(%s) AND id=(%s) FOR UPDATE', (id, int(n))):
            return "Forbidden", 403
        
        query(cursor, 'UPDATE bikes SET latitude=(%s), longitude=(%s) WHERE id=(%s)', (request.form["latitude"], request.form["longitude"], int(n)))
    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400

    commit(cursor)
    dbConn.commit()
    cursor.close()
    dbConn.close()

    return "Ok", 200

@app.route("/clients/<name>", methods=["GET"])
@token_required
def get_client(id, name):
    if not is_admin(id) and not (is_client(id) and get_name(id) == name):
        return "Forbidden", 403

    return get_user(id, name, "clients")

@app.route("/employees/<name>", methods=["GET"])
@token_required
def get_employee(id, name):
    if not is_admin(id) and not (is_employee(id) and get_name(id) == name):
        return "Forbidden", 403

    return get_user(id, name, "employees")

@app.route("/admins/<name>", methods=["GET"])
@token_required
def get_admin(id, name):
    if not is_admin(id) or get_name(id) != name:
        return "Forbidden", 403

    return get_user(id, name, "admins")

def put_user(name, table, first_name, last_name, email):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    transaction(cursor)

    secret = pyotp.random_base32()

    try:
        query(cursor, 'INSERT INTO users (secret, first_name, last_name, email) VALUES (%s, %s, %s, %s)', (secret, first_name, last_name, email)) 
        res = query(cursor, 'SELECT * FROM users WHERE id=(SELECT MAX(id) FROM users)') 
        id = res[0][0]
        query(cursor, f'INSERT INTO {table} (id, name) VALUES (%s, %s)', (id, name))
    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400

    commit(cursor)
    dbConn.commit()
    dbConn.close()
    cursor.close()
   
    return json.dumps({"secret": str(secret)}), 200

@app.route("/clients/<name>", methods=["POST"])
def put_client(name):
    return put_user(name, "clients", request.form["first_name"], request.form["last_name"], request.form["email"])

@app.route("/employees/<name>", methods=["POST"])
def put_employee(name):
    return put_user(name, "employees", request.form["first_name"], request.form["last_name"], request.form["email"])

@app.route("/admins/<name>", methods=["POST"])
def put_admin(name):
    return put_user(name, "admins", request.form["first_name"], request.form["last_name"], request.form["email"])

@app.route("/bicicles/<bike_id>/lock", methods=["PUT"])
@token_required
def lock_bike(id, bike_id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    transaction(cursor)

    secret = pyotp.random_base32()

    try:
        res = query(cursor, 'SELECT * FROM locked_bikes WHERE id=(%s) FOR UPDATE', (bike_id,)) 
        if res != []:
            return "Bicicle already locked", 400

        query(cursor, f'INSERT INTO locked_bikes (id, locked_by) VALUES (%s, %s)', (bike_id, id))
    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400

    commit(cursor)
    dbConn.commit()
    dbConn.close()
    cursor.close()
   
    return "Ok", 200

@app.route("/bicicles/<bike_id>/unlock", methods=["PUT"])
@token_required
def unlock_bike(id, bike_id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    transaction(cursor)

    secret = pyotp.random_base32()

    try:
        res = query(cursor, 'SELECT * FROM locked_bikes WHERE id=(%s) AND locked_by=(%s) FOR UPDATE', (bike_id, id)) 
        if res == []:
            return "Bicicle not locked by this user", 400

        query(cursor, f'DELETE FROM locked_bikes WHERE id=(%s)', (bike_id,))
    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400

    commit(cursor)
    dbConn.commit()
    dbConn.close()
    cursor.close()
   
    return "Ok", 200

@app.route("/bicicles/<bike_id>", methods=["GET"])
@token_required
def get_bike(id, bike_id):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    secret = pyotp.random_base32()
    logger.info("here")

    try:
        res = query(cursor, 'SELECT latitude, longitude, rightly_parked FROM bikes WHERE id=(%s)', (bike_id,)) 
        if res == []:
            return "Bicicle not found", 404

        bike = res[0]
        is_locked = [] != query(cursor, 'SELECT * FROM locked_bikes WHERE id=(%s)', (bike_id,)) 

    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400

    if is_client(id):
        if not is_locked:
            info = {"latitude": bike[0], "longitude": bike[1], "locked": is_locked}
        else:
            info = {"locked": is_locked}
    else:
        info = {"latitude": bike[0], "longitude": bike[1], "rightly_parked": bike[2], "locked": is_locked}

    commit(cursor)
    dbConn.commit()
    dbConn.close()
    cursor.close()
   
    return json.dumps(info), 200

def login_user(name, table):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    otp = request.args.get('otp')

    try:
        res = query(cursor, f'SELECT id, secret FROM users NATURAL JOIN {table} WHERE name=(%s)', (name,)) 
    except Exception as e:
        logger.warning(str(e))
        "Nok", 400

    id = str(res[0][0])
    secret = str(res[0][1])
    totp = pyotp.TOTP(secret)

    if not totp.verify(otp):
        return "Nok", 400

    exp = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    token = jwt.encode({"id": id ,"exp": exp}, APP_KEY, algorithm="HS256")

    cursor.close()
    dbConn.close()
    return json.dumps({"token": str(token)}), 200

@app.route("/clients/<name>/login", methods=["GET"])
def login_client(name):
    return login_user(name, "clients")

@app.route("/employees/<name>/login", methods=["GET"])
def login_employee(name):
    return login_user(name, "employees")

@app.route("/admins/<name>/login", methods=["GET"])
def login_admin(name):
    return login_user(name, "admins")

def remove_user(id, table):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    transaction(cursor)

    try:
        query(cursor, f'DELETE FROM {table} WHERE id=(%s)', (id,)) 
        query(cursor, f'DELETE FROM users WHERE id=(%s)', (id,)) 

    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400

    commit(cursor)
    dbConn.commit()
    dbConn.close()
    cursor.close()
   
    return "Ok", 200

@app.route("/clients/<name>", methods=["DELETE"])
@token_required
def remove_client(id, name):
    if not is_admin(id) and not (is_client(id) and get_name(id) == name):
        return "Forbidden", 403

    return remove_user(id, "clients")

@app.route("/employees/<name>", methods=["DELETE"])
@token_required
def remove_employee(id, name):
    if not is_admin(id) and not (is_employee(id) and get_name(id) == name):
        return "Forbidden", 403

    return remove_user(id, "employees")

@app.route("/admins/<name>", methods=["DELETE"])
@token_required
def remove_admin(id, name):
    if not is_admin(id) or get_name(id) != name:
        return "Forbidden", 403

    return remove_user(id, "admins")

def update_user_email(id, email):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    transaction(cursor)

    try:
        query(cursor, 'UPDATE users SET email=(%s) WHERE id=(%s)', (email, id)) 

    except Exception as e:
        logger.warning(str(e))
        return "Nok", 400

    commit(cursor)
    dbConn.commit()
    dbConn.close()
    cursor.close()
   
    return "Ok", 200

@app.route("/clients/<name>/email", methods=["PUT"])
@token_required
def update_client_email(id, name):
    if not is_client(id) or get_name(id) != name:
        return "Forbidden", 403

    return update_user_email(id, request.form["email"])

@app.route("/employees/<name>/email", methods=["PUT"])
@token_required
def update_employee_email(id, name):
    if not is_employee(id) or get_name(id) != name:
        return "Forbidden", 403

    return update_user_email(id, request.form["email"])

@app.route("/admins/<name>/email", methods=["PUT"])
@token_required
def update_email(id, name):
    if not is_admin(id) or get_name(id) != name:
        return "Forbidden", 403

    return update_user_email(id, request.form["email"])

@app.route("/test_login", methods=["GET"])
@token_required
def test_login(id):
    return "Welcome " + get_name(id), 200

@app.errorhandler(Exception)
@app.route("/default_callback/", methods=["GET", "POST"])
def default_callback(e = None):
    if e is not None:
        return "error: " + str(e), 400
    return "default_callback", 200

app.register_error_handler(Exception, default_callback)
#app.run()
