from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Coach
from database.schemas import coach_schema, coaches_schema
from marshmallow import ValidationError

class CoachesResource(Resource):
    @jwt_required()
    def get(self):
        try:
            verify_jwt_in_request()
            team_id = request.args.get('team_id')
            if (not team_id):
                return "team_id required", 400
            team_coaches = Coach.query.filter_by(team_id=team_id)
            return coaches_schema.dump(team_coaches), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_coach = coach_schema.load(form_data)
            db.session.add(new_coach)
            db.session.commit()
            return coach_schema.dump(new_coach), 201
        except ValidationError as err:
            return err.messages, 400
        
class CoachResource(Resource):

    def get(self, coach_id):
        try:
            #verify_jwt_in_request()
            coach = Coach.query.get_or_404(coach_id)
            return coach_schema.dump(coach), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def put(self, coach_id):
        try:
            verify_jwt_in_request()
            coach = Coach.query.get_or_404(coach_id)

            if 'first_name' in request.json:
                coach.first_name = request.json['first_name']
            if 'last_name' in request.json:
                coach.last_name = request.json['last_name']
            if 'isHeadCoach' in request.json:
                coach.isHeadCoach = request.json['isHeadCoach']
            if 'team_id' in request.json:
                coach.team_id = request.json['team_id']

            db.session.commit()
            return coach_schema.dump(coach), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def delete(self, coach_id):
        try:
            verify_jwt_in_request()
            coach = Coach.query.get_or_404(coach_id)
            db.session.delete(coach)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400