#!/bin/env python3
from wsgiref.handlers import CGIHandler
from flask import Flask
from flask import render_template, request, redirect, url_for, abort
import psycopg2
import psycopg2.extras


DB_HOST="db.tecnico.ulisboa.pt"
DB_USER="ist195670" 
DB_DATABASE=DB_USER
DB_PASSWORD="iygq9765"
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

@app.route("/category/html/insert", methods=["GET"])
def page_category_insert():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM categoria;')

    return render_template("category/insert.html", cursor=res)

@app.route("/category/insert", methods=["POST"])
def category_insert():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    category_name = request.form["category-name"]

    if category_name == "":
        raise Exception("Invalid category name")

    data   = (category_name,)

    transaction(cursor)
    query(cursor, 'INSERT INTO categoria (nome) VALUES (%s)', data)
    query(cursor, 'INSERT INTO categoria_simples (nome) VALUES (%s)', data)

    if "super-category-name" in request.form:
        super_name = request.form["super-category-name"]

        if category_name == "":
            raise Exception("Invalid super category")

        data = (super_name,)
        res = query(cursor, 'SELECT * FROM super_categoria WHERE nome=(%s)', data)
        
        if len(res) != 1:
            query(cursor, 'DELETE FROM categoria_simples WHERE nome=(%s)', data)
            query(cursor, 'INSERT INTO super_categoria (nome) VALUES (%s)', data)

        query(cursor, 'INSERT INTO tem_outra (super_categoria, categoria) VALUES (%s, %s)', (super_name, category_name))

    commit(cursor)
    dbConn.commit()
    cursor.close()
    dbConn.close()

    return redirect(url_for("default_callback"),code = 300);

@app.route("/category/html/remove", methods=["GET"])
def page_category_remove():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM categoria;')

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return render_template("category/remove.html", cursor=res)

@app.route("/category/remove", methods=["POST"])
def category_remove():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    category_name   = request.form["category-name"]
    data   = (category_name,)
    query(cursor, "DELETE FROM tem WHERE nome=(%s)", data)
    query(cursor, "DELETE FROM categoria_simples WHERE nome=(%s)", data)
    query(cursor, "DELETE FROM super_categoria WHERE nome=(%s)", data)
    query(cursor, "DELETE FROM categoria WHERE nome=(%s)", data)
    dbConn.commit()
    cursor.close()
    dbConn.close()

    return redirect(url_for("default_callback"),code = 300);

@app.route("/category/html/list", methods=["GET"])
def page_category_list():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    res = query(cursor, "SELECT * FROM categoria")
    dbConn.commit()
    cursor.close()
    dbConn.close()

    return render_template("category/list.html", cursor=res)

def build_tree(cursor, category):
    res = query(cursor, 'SELECT nome FROM super_categoria;')
    ret = ""
    
    if [category] not in res:
        ret += f"<li>{category}</li>"
    else:
        res = query(cursor, 'SELECT categoria FROM tem_outra WHERE super_categoria=(%s);', (category,))
        ret += f"<li><span class=\"caret\">{category}</span>"
        ret += "<ul class=\"nested\">"

        for child in res:
            ret += build_tree(cursor, child[0])

        ret += "</ul></li>"

    return ret
     

@app.route("/category/list", methods=["POST"])
def category_list():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    category_name = request.form["category-name"]

    res = query(cursor, 'SELECT nome FROM categoria;')
    if [category_name] not in res:
        raise Exception("Invalid category: " + category_name)

    html = build_tree(cursor, category_name)

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return render_template("category/list_result.html", category=category_name, tree=html)

@app.route("/retailer/html/insert", methods=["GET"])
def page_retailer_insert():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT * FROM categoria;')

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return render_template("retailer/insert.html", cursor=res)

@app.route("/retailer/insert", methods=["POST"])
def retailer_insert():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    name = request.form["name"]
    tin = request.form["tin"]
    count = int(request.form["count"])

    transaction(cursor)
    query(cursor, "INSERT INTO retalhista (tin, nome) VALUES (%s, %s)", (tin, name))

    for i in range(count):
        category = request.form[f"category{i}"]
        ivm = request.form[f"ivm{i}"]
        manuf = request.form[f"manuf{i}"]

        query(cursor, "INSERT INTO responsavel_por (nome_cat, tin, num_serie, fabricante) VALUES (%s, %s, %s, %s)", (category, tin, ivm, manuf))
     
    commit(cursor)
    dbConn.commit()
    cursor.close()
    dbConn.close()

    return redirect(url_for("default_callback"),code = 300);

@app.route("/retailer/html/remove", methods=["GET"])
def page_retailer_remove():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    res = query(cursor, 'SELECT tin, nome FROM retalhista;')

    dbConn.commit()
    cursor.close()
    dbConn.close()

    return render_template("retailer/remove.html", cursor=res)

@app.route("/retailer/remove", methods=["POST"])
def retailer_remove():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    if "tin" not in request.form:
        raise Exception("Invalid retailer")

    tin = request.form["tin"]


    transaction(cursor)
    query(cursor, "DELETE FROM responsavel_por WHERE tin=(%s)", (tin,))
    query(cursor, "DELETE FROM retalhista WHERE tin=(%s)", (tin,))
     
    commit(cursor)
    dbConn.commit()
    cursor.close()
    dbConn.close()

    return redirect(url_for("default_callback"),code = 300);

@app.route("/ivm/html/list", methods=["GET"])
def page_ivm_list():
    return render_template("ivm/list.html")

@app.route("/ivm/list", methods=["POST"])
def ivm_list():
    dbConn = psycopg2.connect(DB_CONNECTION_STRING)
    cursor = dbConn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    serial = request.form["serial"]
    manuf = request.form["manuf"]

    if "" in (serial, manuf):
        raise Exception("Invalid IVM")

    res = query(cursor, "SELECT cat, SUM(unidades) FROM evento_reposicao NATURAL JOIN produto WHERE num_serie=(%s) AND fabricante=(%s) GROUP BY cat", (serial, manuf))
     
    dbConn.commit()
    cursor.close()
    dbConn.close()

    return render_template("ivm/list_result.html", serial=serial, manuf=manuf, cursor=res)

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
CGIHandler().run(app)
