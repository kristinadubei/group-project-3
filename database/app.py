from flask import Flask, render_template,jsonify
import json
app = Flask(__name__)

@app.route('/disastertype')
def index():
    with open('disaster_type.json','r') as hfile:
            disaster_data = json.load(hfile)
    return jsonify(disaster_data)
    

if __name__ == '__main__':
    app.run(port=5001, debug=True)
