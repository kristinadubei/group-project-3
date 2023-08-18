from flask import Flask, jsonify
from flask_cors import CORS

import helper
# app = Flask(__name__)


app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_data')
def get_data():
    data = helper.ourdata()
    return jsonify(data)





# Generate mock data for different types of natural disasters
# use SQLalchemy to download data from database
"""-------------------------------------------------------------
disasters = [
    {"type": "Earthquake", "count": random.randint(1, 50)},
    {"type": "Flood", "count": random.randint(1, 50)},
    {"type": "Wildfire", "count": random.randint(1, 50)},
    {"type": "Hurricane", "count": random.randint(1, 50)},
    {"type": "Tornado", "count": random.randint(1, 50)}
]
-------------------------------------------------------------------"""
@app.route('/get_disasters')
def get_disasters():
    return jsonify(helper.data)

@app.route('/get_bar_data')
def get_bar_data():
    bar_data = [{"type": item["type"], "count": item["count"]} for item in disasters]
    return jsonify(bar_data)

@app.route('/get_pie_data')
def get_pie_data():
    total_counts = sum(item["count"] for item in disasters)
    pie_data = [{"type": item["type"], "percentage": (item["count"] / total_counts) * 100} for item in disasters]
    return jsonify(pie_data)

@app.route('/get_bubble_data')
def get_bubble_data():
    bubble_data = [{"type": item["type"], "count": item["count"], "magnitude": random.randint(1, 10)} for item in disasters]
    return jsonify(bubble_data)

if __name__ == '__main__':
    app.run(debug=True)

