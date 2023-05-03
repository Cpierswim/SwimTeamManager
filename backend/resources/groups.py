from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Group
from database.schemas import group_schema, groups_schema
from marshmallow import ValidationError
from dotenv import load_dotenv
from os import environ

load_dotenv()
secret_key = environ.get('GOOGLE_MAPS_API_KEY')

class GroupsResource(Resource):
    def get(self):
        try:
            team_id = request.args.get('team_id')
            if (not team_id):
                return "team_id required", 400
            groups = Group.query.filter_by(team_id=team_id)
            return groups_schema.dump(groups), 200
        except ValidationError as err:
            return err.messages, 401
        
    @jwt_required()
    def post(self):
        try:
            # verify_jwt_in_request()
            form_data = request.get_json()
            new_group = group_schema.load(form_data)
            db.session.add(new_group)
            db.session.commit()
            return group_schema.dump(new_group), 201
        except ValidationError as err:
            return err.messages, 401
    
class GroupResource(Resource):
    @jwt_required()
    def delete(self, group_id):
        try:
            verify_jwt_in_request()
            group = Group.query.get_or_404(group_id)
            db.session.delete(group)
            db.session.commit()
        except ValidationError as err:
            return err.messages, 401
        
    @jwt_required()
    def put(self, group_id):
        try:
            verify_jwt_in_request()
            group = Group.query.get_or_404(group_id)

            if 'group_name' in request.json:
                group.group_name = request.json['group_name']

            db.session.commit()
            return group_schema.dump(group), 202
        except ValidationError as err:
            return err.messages, 401