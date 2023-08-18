from flask import Flask, jsonify
from flask_cors import CORS

import helper
# app = Flask(__name__)


app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

@app.route('/get_data')
def get_data():
    data = helper.get_data_for_stuff()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
