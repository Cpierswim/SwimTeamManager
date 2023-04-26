from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Team
from database.schemas import team_schema

class TeamResource(Resource):
    def get(self, team_id):
        team = Team.query.get_or_404(team_id)
        return team_schema.dump(team), 200