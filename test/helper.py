from flask import Flask, render_template, jsonify
from flask_cors import CORS
import random
import sqlalchemy as sq


def ourdata():
    engine=sq.create_engine('"sqlite:///../natural_disasters.db"')
    conn = engine.connect()
    metadata=sq.MetaData()
    table=sq.Table('natural_disasters_data', metadata, autoload_with=engine)
    exe = conn.execute(sq.text("SELECT * FROM natural_disasters_data LIMIT 5"))
    result = exe.fetchmany(5)






