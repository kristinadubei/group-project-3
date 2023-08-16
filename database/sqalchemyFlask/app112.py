from sqlalchemy import create_engine,func,inspect
from sqlalchemy.ext.automap import automap_base
from  sqlalchemy.orm import Session
from pathlib import Path
data_path = Path('../database/natural_disasters.DB')
engine = create_engine(f'sqlite:///{data_path}')
Base = automap_base()
Base.prepare(autoload_with=engine)
session=Session(bind=engine)
Natural=Base.classes.natural_disasters_data
inspector = inspect(engine)
inspector.get_columns
from flask import Flask 

app = Flask(__name__)

@app.route('/groupby')
def homepage():
    session = Session(engine)
    x = session(Natural.country,func(sum(Natural.Country)).group_by(Natural.Country))
    return x
# @app.route('/timeline')
# def homepage():

#     return {
#         '1': 100,
#         '2': 300
#     }
# d3.json('localhost:5000/timeline')
session.close()

if __name__ == "__main__":
    app.run(debug=True)
