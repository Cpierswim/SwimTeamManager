from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, User, Coach, Team
from database.schemas import user_schema, coach_schema, team_schema, register_schema
from marshmallow import ValidationError

class SetupResource(Resource):
    def post(self):
        default_team = {
            "team_name": "JCC Stingrays",
            "abbreviation": "JCC"
        }
        default_coach = {
            "isHeadCoach": True,
            "last_name": "Coach",
            "first_name": "Head", 
            "team_id": 1
        }
        default_user = {
            "username": "admin",
            "password": "password", 
            "first_name": "admin", 
            "last_name": "coach",
            "email": "none@none.com",
            "type": 2,
            "coach_id": 1
        }
        new_team = team_schema.load(default_team)
        default_coach["team_id"] = new_team['id']
        new_coach = coach_schema.load(default_coach)
        default_user['coach_id'] = new_coach['id']
        new_user = register_schema.load(default_user)
        new_user.hash_password()

        db.session.add(new_team)
        db.session.add(new_coach)
        db.session.add(new_user)
        db.session.commit()

        return "Setup Sucessfull", 201
        