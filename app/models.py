import datetime
from dataclasses import dataclass

from app import db


@dataclass
class NaturalDisasters(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    Year = db.Column(db.Integer, nullable=False)
    Seq = db.Column(db.Integer, nullable=False)
    Glide = db.Column(db.String(255))
    Disaster_Group = db.Column(db.String(255), nullable=False)
    Disaster_Subgroup = db.Column(db.String(255), nullable=False)
    Disaster_Type = db.Column(db.String(255), nullable=False)
    Disaster_Subtype = db.Column(db.String(255))
    Country = db.Column(db.String(255), nullable=False)
    ISO = db.Column(db.String(255), nullable=False)
    Region = db.Column(db.String(255), nullable=False)
    Continent = db.Column(db.String(255), nullable=False)
    Origin = db.Column(db.String(1000))
    Associated_Dis = db.Column(db.String(255))
    Associated_Dis2 = db.Column(db.String(255))
    Aid_Contribution = db.Column(db.Integer)
    Dis_Mag_Value = db.Column(db.Integer)
    Dis_Mag_Scale = db.Column(db.String(255))
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    Local_Time = db.Column(db.Time,nullable=True)
    Start_Year = db.Column(db.Integer, nullable=False)
    Start_Month = db.Column(db.Integer)
    Start_Day = db.Column(db.Integer)
    End_Year = db.Column(db.Integer, nullable=False)
    End_Month = db.Column(db.Integer)
    End_Day = db.Column(db.Integer)
    Total_Deaths = db.Column(db.Integer)
    No_Injured = db.Column(db.Integer)
    No_Affected = db.Column(db.Integer)
    No_Homeless = db.Column(db.Integer)
    Total_Affected = db.Column(db.Integer)
    Insured_Damages_USD = db.Column(db.Integer)
    Total_Damages_USD = db.Column(db.Integer)
    CPI = db.Column(db.Float)
