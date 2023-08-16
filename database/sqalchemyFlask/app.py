# from sqlalchemy import create_engine,func,inspect
# from sqlalchemy.ext.automap import automap_base
# from  sqlalchemy.orm import Session
# from pathlib import Path
# data_path = Path('../database/natural_disasters.DB')
# engine = create_engine(f'sqlite:///{data_path}',pool_pre_ping=True)
# Base = automap_base()
# Base.prepare(autoload_with=engine)
# Natural=Base.classes.natural_disasters_data
# inspector = inspect(engine)
# inspector.get_columns
# from flask import Flask , jsonify

# app = Flask(__name__)
# @app.route('/groupby')
# def homepage():
#     session = Session(engine)
#     x = session.query(Natural.country,func.count(Natural.Country)).group_by('Country')
#     return jsonify(x)
#     session.close()
# # @app.route('/timeline')
# # def homepage():

# #     return {
# #         '1': 100,
# #         '2': 300
# #     }
# # d3.json('localhost:5000/timeline')
# if __name__ == '__main__':
#     app.run(debug=True)


# ----------------------------------------

from sqlalchemy import create_engine, func, inspect
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from pathlib import Path
from flask import Flask, jsonify

data_path = Path('../database/natural_disasters.DB')
# engine = create_engine(f'sqlite:///{data_path}', pool_pre_ping=True)
# Base = automap_base()
# Base.prepare(autoload_with=engine)
# Natural = Base.classes.natural_disasters_data
# inspector = inspect(engine)
# columns = inspector.get_columns('natural_disasters_data')
engine = create_engine("sqlite:///../natural_disasters.sqlite")

conn = engine.connect() 


app = Flask(__name__)

@app.route('/groupby')
def homepage():
    session = Session(engine)
    x = session.query(Natural.country, func.count(Natural.country)).group_by(Natural.country).all()
    session.close()
    return jsonify(x)

if __name__ == '__main__':
    app.run(debug=True)
