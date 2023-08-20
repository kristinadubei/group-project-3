from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import csv
import os
from flask_cors import CORS

app = Flask(__name__, template_folder='../templates')

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///disasters.db'
db = SQLAlchemy(app)
CORS(app)

