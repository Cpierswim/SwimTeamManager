from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Meet
from database.schemas import meet_schema, meets_schema
from marshmallow import ValidationError

class MeetsResource(Resource):
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_meet = meet_schema.load(form_data)
            db.session.add(new_meet)
            db.session.commit()
            return meet_schema.dump(new_meet), 201
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def get(self):
        try:
            verify_jwt_in_request()
            team_id = request.args.get('team_id')
            if (not team_id):
                return "team_id required", 400
            meets = Meet.query.filter_by(team_id=team_id)
            return meets_schema.dump(meets), 200
        except ValidationError as err:
            return err.messages, 400
        
class MeetResource(Resource):
    @jwt_required()
    def get(self, meet_id):
        try:
            verify_jwt_in_request()
            meet = Meet.query.get_or_404(meet_id)
            return meet_schema.dump(meet), 200
        except ValidationError as err:
            return err.messages, 400
    
    @jwt_required()
    def delete(self, meet_id):
        try:
            verify_jwt_in_request()
            meet = Meet.query.get_or_404(meet_id)
            db.session.delete(meet)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def put(self, meet_id):
        try:
            verify_jwt_in_request()
            meet = Meet.query.get_or_404(meet_id)

            if 'address_id' in request.json:
                meet.address_id = request.json['address_id']
            if 'location_name' in request.json:
                meet.location_name = request.json['location_name']
            if 'date' in request.json:
                meet.date = request.json['date']
            if 'age_up_date' in request.json:
                meet.age_up_date = request.json['age_up_date']
            if 'start_time' in request.json:
                meet.start_time = request.json['start_time']
            if 'name' in request.json:
                meet.name = request.json['name']
            if 'team_id' in request.json:
                meet.team_id = request.json['team_id']

            db.session.commit()
            return meet_schema.dump(meet), 200
        except ValidationError as err:
            return err.messages, 400