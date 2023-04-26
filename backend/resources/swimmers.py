from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Swimmer
from database.schemas import swimmer_schema, swimmers_schema

class SwimmerResource(Resource):
    @jwt_required()
    def get(self, swimmer_id):
        try:
            verify_jwt_in_request()
            swimmer = Swimmer.query.filter_by(swimmer_id=swimmer_id)
            return swimmer_schema.dump(swimmer), 200
        except:
            return "Unauthorized", 401
    
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_swimmer = swimmer_schema.load(form_data)
            db.session.add(new_swimmer)
            db.session.commit()
            return swimmer_schema.dump(new_swimmer), 201
        except:
            return "Unauthorized", 401
    
    @jwt_required()
    def put(self, swimmer_id):
        try:
            verify_jwt_in_request()
            swimmer = Swimmer.query.get_or_404(swimmer_id)

            if 'first_name' in request.json:
                swimmer.first_name = request.json['first_name']
            if 'last_name' in request.json:
                swimmer.last_name = request.json['last_name']
            if 'preferred_first_name' in request.json:
                swimmer.preferred_first_name = request.json['preferred_first_name']
            if 'middle_name' in request.json:
                swimmer.middle_name = request.json['middle_name']
            if 'birthdate' in request.json:
                swimmer.birthdate = request.json['birthdate']
            if 'gender' in request.json:
                swimmer.gender = request.json['gender']
            if 'group_id' in request.json:
                swimmer.group_id = request.json['group_id']
            if 'address_id' in request.json:
                swimmer.address_id = request.json['address_id']
            if 'team_id' in request.json:
                swimmer.team_id = request.json['team_id']

            db.session.commit()
            return swimmers_schema.dump(swimmer), 200
        except:
            return "Unauthorized", 401
        
    @jwt_required()
    def delete(self, swimmer_id):
        try:
            verify_jwt_in_request()
            swimmer = Swimmer.get_or_404(swimmer_id)
            db.session.delete(swimmer)
            db.session.commit()
            return "", 204
        except:
            return "Unauthorized", 401

class SwimmersResource(Resource):
    @jwt_required()
    def get(self, team_id):
        try:
            verify_jwt_in_request()
            team_swimmers = Swimmer.query.filter_by(team_id=team_id)
            return swimmers_schema.dump(team_swimmers), 200
        except:
            return "Unauthorized", 401