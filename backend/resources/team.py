from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Team
from database.schemas import team_schema
from dotenv import load_dotenv
from os import environ

load_dotenv()
secret_key = environ.get('ADD_TEAM_SECRET_KEY')

class TeamResource(Resource):
    def get(self, team_id):
        team = Team.query.get_or_404(team_id)
        return team_schema.dump(team), 200
    
class TeamsResource(Resource):  
    def post(self):
        form_data = request.get_json()
        try:
            if(form_data["secret_key"] != secret_key):
                return "Cannot add new Teams", 405
            else:
                del form_data["secret_key"]
                new_team = team_schema.load(form_data)
                db.session.add(new_team)
                db.session.commit()
                return team_schema.dump(new_team), 201
        except:
            return "Cannot Add New Teams", 403
        