from flask import request
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from database.models import db, User, LastFamilyID, Address
from database.schemas import register_schema, user_schema, last_family_id_schema, address_schema, parent_schema, swimmer_schema
from marshmallow import ValidationError
import datetime
import json
from dotenv import load_dotenv
from os import environ
from urllib.request import urlopen

load_dotenv()
GOOGLE_MAPS_API_KEY = environ.get('GOOGLE_MAPS_API_KEY')

def getLatLongFromGoogleAPIData(data):
    data = data['results'][0]
    lat_long_object = data['geometry']['location']
    lat = lat_long_object['lat']
    long = lat_long_object['lng']
    return lat, long


class RegisterResource(Resource):
    """ User Registration, creates new user """
    def post(self):
        form_data = request.get_json()
        familyID = LastFamilyID.query.get_or_404(1)
        familyID = familyID.last_family_id
        registration_data = {
            'username': form_data['username'],
            'password': form_data['password'],
            'email': form_data['email'],
            'first_name': form_data['first_name'],
            'last_name': form_data['last_name'],
            'type': form_data['type'],
            'family_id': familyID
        }
        try:
            new_user = register_schema.load(registration_data)
            new_user.hash_password()
            db.session.add(new_user)
            
            # Now add the address
            address = form_data['address']
            url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address['address_line_one']} {address['address_line_two']} "
            url = url + f"{address['city']}, {address['state']} {address['zipcode']}&key={GOOGLE_MAPS_API_KEY}"
            url = url.replace("  ", " ")
            encodedurl = url.replace(" ", "%20")
            response = urlopen(encodedurl)
            maps_api_data = json.loads(response.read())
            lat, long = getLatLongFromGoogleAPIData(maps_api_data)
            address['latitude'] = lat
            address['longitude'] = long
            new_address = address_schema.load(address)
            db.session.add(new_address)
            db.session.commit()

            #Now add the parent
            address_id = new_address.id
            parent = form_data['parent']
            parent['family_id'] = familyID
            parent['address_id'] = address_id
            new_parent = parent_schema.load(parent)
            db.session.add(new_parent)
            
            #Now add the swimmers
            swimmers = form_data['swimmers']
            for swimmer in swimmers:
                swimmer['address_id'] = address_id
                swimmer['team_id'] = 1 #This should change to getting from the database but isn't required in user stories and I'm running out of time
                swimmer['family_id'] = familyID
                new_swimmer = swimmer_schema.load(swimmer)
                db.session.add(new_swimmer)

            #increment the last family id
            last_id = LastFamilyID.query.get_or_404(1)
            last_id.last_family_id = last_id.last_family_id + 1
            
            db.session.commit()
            return user_schema.dump(new_user), 201
        except ValidationError as err:
            return err.messages, 400

class LoginResource(Resource):
    """ User Login, responds with access token """
    def post(self):
        form_data = request.get_json()
        user = db.one_or_404(
            User.query.filter_by(username=form_data.get('username')),
            description=f"No user with that username."
        )
        authorized = user.check_password(form_data.get('password'))
        if not authorized:
            return {'error': 'Username or password invalid'}, 401
        expires = datetime.timedelta(days=7)
        print(user.id)
        additional_claims = {
            'id': user.id,
            'username': user.username,
            'type': user.type,
            'family_id': user.family_id
        }
        access_token = create_access_token(identity=str(user.id), additional_claims=additional_claims, expires_delta=expires)
        return {'access': access_token}, 200