from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, GroupCoach
from database.schemas import group_coach_schema, group_coaches_schema
from marshmallow import ValidationError

class GroupCoachesResource(Resource):
    @jwt_required()
    def post(self):
        try: 
            verify_jwt_in_request()
            form_data = request.get_json()
            new_group_coach_relationship = group_coach_schema.load(form_data)
            db.session.add(new_group_coach_relationship)
            db.session.commit()
            return group_coach_schema.dump(new_group_coach_relationship), 201
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def get(self):
        try:
            verify_jwt_in_request()
            coach_id = request.args.get('coach_id')
            group_id = request.args.get('group_id')
            if (coach_id and group_id):
                return "cannot search by both coach_id and group_id", 400
            if(not coach_id and not group_id):
                return "must search by either coach_id or group_id", 400
            if(coach_id):
                results_by_coach = GroupCoach.query.filter_by(coach_id=coach_id)
                return group_coaches_schema.dump(results_by_coach), 200
            if(group_id):
                results_by_group = GroupCoach.query.filter_by(group_id=group_id)
                return group_coaches_schema.dump(results_by_group), 200
        except ValidationError as err:
            return err.messages, 400
        
class GroupCoachResource(Resource):
    @jwt_required()
    def delete(self, coach_id, group_id):
        try:
            verify_jwt_in_request()
            group_coach_relationship = GroupCoach.query.filter_by(coach_id=coach_id, group_id=group_id).first()
            db.session.delete(group_coach_relationship)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400