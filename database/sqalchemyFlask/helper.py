import sqlalchemy as db

from flask import Flask, jsonify


def get_data_for_stuff():
    engine = db.create_engine("sqlite:///../natural_disasters.db")

    conn = engine.connect() 

    metadata = db.MetaData() #extracting the metadata
    data = db.Table('natural_disasters_data', metadata, autoload_with=engine) #Table object


    # data.
    # query = data.select() #SELECT * FROM divisions
    # print(query)

    exe = conn.execute(db.text("SELECT * FROM natural_disasters_data WHERE year is not null limit 100;")) #executing the query
    result = exe.fetchmany(100) #extracting top 5 results

    year = []
    seq = []
    glide = []
    for record in result:
        year.append(record[0])
        seq.append(record[1])
        glide.append(record[2])
    return {
        'x': year,
        'y': seq,
    }

# print(get_data_for_stuff())
