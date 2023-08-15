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

session.close()

if __name__ == "__main__":
    app.run(debug=True)
