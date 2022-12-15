#!/bin/env python3
from flask import Flask
from flask import render_template, request, redirect, url_for, abort
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
    return render_template("index.html")

@app.route("/users/<name>", methods=["GET"])
def get_user(name):
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM users WHERE name=(%s)', name) 

    return str(res), 200

@app.errorhandler(Exception)
@app.route("/default_callback/", methods=["GET", "POST"])
def default_callback(e = None):
    if e is None:
        return '''<html>
                <title>BD Project - Success</title>
                <h2>Operation was successful</h2>
                <button onclick="history.back()">Back</button>
                </html>'''
    else:
        return f'''<html>
                <title>BD Project - Error</title>
                <h2>An error occurred while executing operation</h2>
                <h3>{e}</h3>
                <button onclick="history.back()">Back</button>
                </html>'''

app.register_error_handler(Exception, default_callback)
app.run(host="0.0.0.0")