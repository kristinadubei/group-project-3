from datetime import datetime, timedelta

from app import app as flask_app
from app import db
from .models import NaturalDisasters
from flask import request, render_template, jsonify, send_file
import csv
import io

from .serializers import NaturalDisastersSchema
from .utils import convert_csv_row_to_json


@flask_app.route('/per-year', methods=['GET'])
def per_year_data():
    grouped_data = db.session.query(
        NaturalDisasters.Year,
        db.func.count(NaturalDisasters.id).label('count')
    ).group_by(NaturalDisasters.Year).order_by(NaturalDisasters.Year.desc()).all()
    grouped_data_list = [{'x': group, 'y': count} for group, count in grouped_data]
    return jsonify(grouped_data_list)


@flask_app.route('/most-frequent', methods=['GET'])
def most_frequent_disasters():
    grouped_data = db.session.query(
        NaturalDisasters.Disaster_Type,
        db.func.count(NaturalDisasters.id).label('count')
    ).group_by(NaturalDisasters.Disaster_Type).order_by(db.func.count(NaturalDisasters.id).desc()).all()
    grouped_data_list = [{'x': group, 'y': count} for group, count in grouped_data]
    return jsonify(grouped_data_list)

@flask_app.route('/disaster-by-death', methods=['GET'])
def disaster_by_death():
    grouped_data = db.session.query(
        NaturalDisasters.Disaster_Type,
        db.func.sum(NaturalDisasters.Total_Deaths).label('total_deaths')
    ).group_by(NaturalDisasters.Disaster_Type).order_by(db.func.sum(NaturalDisasters.Total_Deaths).desc()).all()
    grouped_data_list = [{'x': group, 'y': count} for group, count in grouped_data]
    return jsonify(grouped_data_list)

@flask_app.route('/disaster-by-country', methods=['GET'])
def disaster_by_country():
    grouped_data = db.session.query(
        NaturalDisasters.Country,
        db.func.count(NaturalDisasters.id).label('count')
    ).group_by(NaturalDisasters.Country).order_by(db.func.count(NaturalDisasters.id).desc()).limit(20).all()
    grouped_data_list = [{'x': group, 'y': count} for group, count in grouped_data]
    return jsonify(grouped_data_list)


@flask_app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@flask_app.route('/get_all', methods=['GET'])
def get_all():
    limit = request.args.get("limit",1000)
    twenty_years_ago = datetime.now() - timedelta(days=20 * 365)
    print(twenty_years_ago)
    data = NaturalDisasters.query.filter(NaturalDisasters.Year>=twenty_years_ago.year).order_by(NaturalDisasters.Year.desc()).limit(5000).all()
    print(len(data))
    schema = NaturalDisastersSchema(many=True)
    serialized_data = schema.dump(data)
    return serialized_data


@flask_app.route('/img/<filename>')
def render_image(filename):
    return send_file(f'img/{filename}', mimetype='image/jpeg')