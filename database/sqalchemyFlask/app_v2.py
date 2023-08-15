from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from  sqlalchemy.orm import Session
from pathlib import Path
data_path = Path('../database/natural_disasters_db.sqlite')
engine = create_engine(f'sqlite:///{data_path}')
Base = automap_base()
Base.prepare(autoload_with=engine)
session=Session(bind=engine)

from flask import Flask 

app = Flask(__name__)

@app.route(data_path)
def homepage():
    session = Session()
    return 


@app.route('/timeline')
def homepage():

    return {
        '1': 100,
        '2': 300
    }
d3.json('localhost:5000/timeline')
session.close()

if __name__ == "__main__":
    app.run(debug=True)
