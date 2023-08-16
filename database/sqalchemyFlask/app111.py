from flask import Flask, jsonify
from flask_cors import CORS
# app = Flask(__name__)


app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Sample data
data = [
    {"x": 1, "y": 5},
    {"x": 2, "y": 10},
    {"x": 3, "y": 8},
    {"x": 4, "y": 15},
    {"x": 5, "y": 12}
]

@app.route('/get_data')
def get_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
