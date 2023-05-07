from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Address
from database.schemas import address_schema, addressses_schema
from marshmallow import ValidationError
from dotenv import load_dotenv
from os import environ

load_dotenv()
GOOGLE_MAPS_API_KEY = environ.get('GOOGLE_MAPS_API_KEY')

class EnvironmentResource(Resource):
    def get(self, key):
        if(key == "GOOGLE_MAPS_API_KEY"):
            return GOOGLE_MAPS_API_KEY, 200
        else:
            return "not valid key", 404