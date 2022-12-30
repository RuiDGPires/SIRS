#!/bin/env python3
from flask import Flask
from flask import request, redirect, url_for, abort
import psycopg2
import psycopg2.extras
import logging
import os
import gunicorn.glogging
import pyotp

CWD = os.path.dirname(__file__)


DB_HOST="192.168.0.10"
DB_USER="master" 
DB_DATABASE="sirs"
DB_PASSWORD="sirsebuefixe"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD)

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

@app.route("/")
def index():
    logger.info("Ok")
    return "ok", 200

@app.route("/users/<name>", methods=["GET"])
def get_user(name):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    try:
        res = query(cursor, 'SELECT * FROM users WHERE name=(%s)', (name,)) 
    except Exception as e:
        logger.warning(str(e))
        "Nok", 400

    return str(res), 200

@app.route("/users/<name>", methods=["PUT"])
def put_user(name):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    secret = pyotp.random_base32()

    try:
        res = query(cursor, 'INSERT INTO users (name, secret) VALUES (%s, %s)', (name, secret)) 
    except Exception as e:
        logger.warning(str(e))
        "Nok", 400

    return "Ok: " + str(secret), 200

@app.route("/login/<name>", methods=["GET"])
def login(name):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    otp = request.args.get('otp')


    try:
        res = query(cursor, 'SELECT secret FROM users WHERE name=(%s)', (name,)) 
    except Exception as e:
        logger.warning(str(e))
        "Nok", 400

    secret = str(res[0][0])
    totp = pyotp.TOTP(secret)

    if totp.verify(otp):
        return "Ok", 200
    else:
        return "Nok", 400


@app.errorhandler(Exception)
@app.route("/default_callback/", methods=["GET", "POST"])
def default_callback(e = None):
    if e is not None:
        return "error: " + str(e), 400
    return "default_callback", 200

app.register_error_handler(Exception, default_callback)
#app.run()
