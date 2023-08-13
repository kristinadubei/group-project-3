-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).


CREATE TABLE "natural_disasters_data" (
    "ID" serial   NOT NULL,
    "Year" int   NOT NULL,
    "Seq" int   NOT NULL,
    "Glide" varchar(255),
    "Disaster_Group" varchar(255)   NOT NULL,
    "Disaster_Subgroup" varchar(255)   NOT NULL,
    "Disaster_Type" varchar(255)   NOT NULL,
    "Disaster_Subtype" varchar(255),
    "Country" varchar(255)   NOT NULL,
    "ISO" varchar(255)   NOT NULL,
    "Region" varchar(255)   NOT NULL,
    "Continent" varchar(255)   NOT NULL,
	"Origin" varchar(1000),
    "Associated_Dis" varchar(255),
    "Associated_Dis2" varchar(255),
    "Aid_Contribution" int,
    "Dis_Mag_Value" int,
    "Dis_Mag_Scale" varchar(255),
    "Latitude" float,
    "Longitude" float,
    "Local_Time" time,
    "River_Basin" varchar(1000),
    "Start_Year" int   NOT NULL,
    "Start_Month" int,
    "Start_Day" int,
    "End_Year" int   NOT NULL,
    "End_Month" int,
    "End_Day" int,
    "Total_Deaths" int,
    "No_Injured" int,
    "No_Affected" int,
    "No_Homeless" int,
    "Total_Affected" int,
    "Insured_Damages_USD" int,
    "Total_Damages_USD" int,
    "CPI" float,
    CONSTRAINT "pk_natural_disasters_data" PRIMARY KEY (
        "ID"
     )
);

