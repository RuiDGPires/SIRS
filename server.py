#!/bin/env python3
from flask import Flask
from flask import request, redirect, url_for, abort
import psycopg2
import psycopg2.extras


DB_HOST="192.168.0.10"
DB_USER="master" 
DB_DATABASE=DB_USER
DB_PASSWORD="sirsebuefixe"
DB_CONNECTION_STRING = "host=%s dbname=%s user=%s password=%s" % (DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD)

app = Flask(__name__)

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
    return "ok", 200

@app.route("/users/<name>", methods=["GET"])
def get_user(name):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    try:
        res = query(cursor, 'SELECT * FROM users WHERE name=(%s)', (name,)) 
    except Exception as e:
        app.logger.warning(str(e))
        "Nok", 400

    return str(res), 200

@app.errorhandler(Exception)
@app.route("/default_callback/", methods=["GET", "POST"])
def default_callback(e = None):
    if e is not None:
        return str(e), 400
    return "default_callback", 200

app.register_error_handler(Exception, default_callback)
app.run()
