from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Address
from database.schemas import address_schema, addressses_schema
from marshmallow import ValidationError
import urllib.parse
from urllib.request import urlopen
import json
from dotenv import load_dotenv
from os import environ

load_dotenv()
GOOGLE_MAPS_API_KEY = environ.get('GOOGLE_MAPS_API_KEY')

def getLatLongFromGoogleAPIData(data):
    data = data['results'][0]
    lat_long_object = data['geometry']['location']
    lat = lat_long_object['lat']
    long = lat_long_object['lng']
    return lat, long

class AddressesResource(Resource):
    def post(self):
        try:
            form_data = request.get_json()
            url = f"https://maps.googleapis.com/maps/api/geocode/json?address={form_data['address_line_one']} {form_data['address_line_two']} "
            url = url + f"{form_data['city']}, {form_data['state']} {form_data['zipcode']}&key={GOOGLE_MAPS_API_KEY}"
            url = url.replace("  ", " ")
            encodedurl = url.replace(" ", "%20")
            response = urlopen(encodedurl)
            maps_api_data = json.loads(response.read())
            lat, long = getLatLongFromGoogleAPIData(maps_api_data)
            form_data['latitude'] = lat
            form_data['longitude'] = long
            new_address = address_schema.load(form_data)
            db.session.add(new_address)
            db.session.commit()
            return address_schema.dump(new_address), 201
        except ValidationError as err:
            return err.messages, 401
    
class AddressResource(Resource):    
    @jwt_required()
    def get(self, address_id):
        try:
            verify_jwt_in_request()
            groups = Address.query.get_or_404(address_id)
            return address_schema.dump(groups), 200
        except ValidationError as err:
            return err.messages, 401
        
    @jwt_required()
    def delete(self, address_id):
        try:
            verify_jwt_in_request()
            address = Address.query.get_or_404(address_id)
            db.session.delete(address)
            db.session.commit()
        except ValidationError as err:
            return err.messages, 401
        
    @jwt_required()
    def put(self, address_id):
        try:
            verify_jwt_in_request()
            address = Address.query.get_or_404(address_id)

            changed = False
            if 'address_line_one' in request.json:
                address.address_line_one = request.json['address_line_one']
                changed = True
            if 'address_line_two' in request.json:
                address.address_line_two = request.json['address_line_two']
                changed = True
            if 'city' in request.json:
                address.city = request.json['city']
                changed = True
            if 'state' in request.json:
                address.state = request.json['state']
                changed = True
            if 'zipcode' in request.json:
                address.zipcode = request.json['zipcode']
                changed = True

            if(changed):
                url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address.address_line_one} {address.address_line_two} "
                url = url + f"{address.city}, {address.state} {address.zipcode}&key={GOOGLE_MAPS_API_KEY}"
                url = url.replace("  ", " ")
                encodedurl = url.replace(" ", "%20")
                response = urlopen(encodedurl)
                maps_api_data = json.loads(response.read())
                address.latitude, address.longitude = getLatLongFromGoogleAPIData(maps_api_data)
                

            db.session.commit()
            return address_schema.dump(address), 202
        except ValidationError as err:
            return err.messages, 401