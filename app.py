from flask import Flask, render_template, redirect, jsonify
import os
from dotenv import load_dotenv

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# Database info
database_url = f'postgres://reaezfozrsjmph:eef5dc50a34fa7d55bd48753f2a26433403703bffaa050047cb5cf2de1802317@ec2-50-17-197-184.compute-1.amazonaws.com:5432/db50kkp5jfipuc'
    
# Database Connection
engine = create_engine(database_url)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Locations = Base.classes.locations

# Create an instance of Flask
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/data")
def data():
    return render_template("data.html")

# Route to render index.html template using data from Mongo
@app.route("/api/locations")
def locations():

    #'''
    #Access-Control-Allow-Origin:*
    #'''

    # Create our session (link) from Python to the DB
    session = Session(engine)

    location_data = session.query(Locations.loc_id, Locations.location, Locations.description,
                        Locations.city, Locations.state, Locations.state_abbrev,
                        Locations.longitude, Locations.latitude).all()

    session.close()

    # Convert query results to a dictionary
    loc_ls = []
    for loc_id, location, description, city, state, state_abbrev,  longitude, latitude, in location_data:
        loc_dict = {}
        loc_dict["loc_id"] = loc_id
        loc_dict["location"] = location
        loc_dict["description"] = description
        loc_dict["city"] = city
        loc_dict["state"] = state
        loc_dict["state_abbrev"] = state_abbrev
        loc_dict["longitude"] = longitude
        loc_dict["latitude"] = latitude
        loc_ls.append(loc_dict)

    return jsonify(loc_ls)


# Route that will trigger the scrape function
@app.route("/api/<state>")
def find_state(state):

    # Create our session (link) from Python to the DB
    session = Session(engine)

    location_data = session.query(Locations.loc_id, Locations.location, Locations.description,
                        Locations.city, Locations.state, Locations.state_abbrev,
                        Locations.longitude, Locations.latitude).filter(Locations.state == state).all()

    session.close()

    # Convert query results to a dictionary
    state_ls = []
    for loc_id, location, description, city, state, state_abbrev,  longitude, latitude, in location_data:
        state_dict = {}
        state_dict["loc_id"] = loc_id
        state_dict["location"] = location
        state_dict["description"] = description
        state_dict["city"] = city
        state_dict["state"] = state
        state_dict["state_abbrev"] = state_abbrev
        state_dict["longitude"] = longitude
        state_dict["latitude"] = latitude
        state_ls.append(state_dict)

    return jsonify(state_ls)

if __name__ == "__main__":
    app.run(debug=True)
