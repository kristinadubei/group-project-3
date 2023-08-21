from flask import Flask, request, jsonify, render_template
import json
import pandas as pd

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index2.html")

# Load the Geo_map_data from the JSON file
try:
    with open("geo_map_data.json", "r") as file:
        data = json.load(file)
        Geo_map_data = pd.DataFrame(data)
except Exception as e:
    print(f"Error loading JSON data: {e}")
    Geo_map_data = pd.DataFrame()

@app.route('/getFilteredData', methods=['GET'])
def get_filtered_data():
    country = request.args.get('country')
    continent = request.args.get('continent')
    disaster = request.args.get('disaster')

    # Filter the dataframe
    filtered_data = Geo_map_data
    if country:
        filtered_data = filtered_data[filtered_data["Country"] == country]
    if continent:
        filtered_data = filtered_data[filtered_data["Continent"] == continent]
    if disaster:
        filtered_data = filtered_data[filtered_data["Disaster_Type"] == disaster]

    # Convert to JSON and return
    return jsonify(filtered_data.to_dict(orient="records"))

@app.route('/get_geo_map_data', methods=['GET'])
def get_geo_map_data():
    return jsonify(Geo_map_data.to_dict(orient="records"))


if __name__ == "__main__":
    app.run(debug=True)




# Create a dictionary to hold a key, value pair.
#hello_dict = {"Hello": "World!"}

# Define what to do when a user hits the index route.
#@app.route("/")
#def home():
#    return "Hi"

# Define what to do when a user hits the /normal route
#@app.route("/normal")
#def normal():
#   return hello_dict

# Define what to do when a user hits the /jsonified route
#@app.route("/jsonified")
#def jsonified():
#   return jsonify(hello_dict)


#if __name__ == "__main__":
#   app.run(debug=True)