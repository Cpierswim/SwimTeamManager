from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, MeetSignup
from database.schemas import meet_signup_schema, meet_signups_schema
from marshmallow import ValidationError

class MeetSignupsResource(Resource):
    @jwt_required()
    def get(self, swimmer_id):
        meet_signups = MeetSignup.query.filter_by(swimmer_id=swimmer_id)
        return meet_signups_schema.dump(meet_signups), 200
    
class MeetSignupsByMeetResource(Resource):
    @jwt_required()
    def get(self, meet_id):
        meet_signups = MeetSignup.query.filter_by(meet_id=meet_id)
        return meet_signups_schema.dump(meet_signups), 200
    
class MeetSignupResource(Resource):
    @jwt_required()
    def delete(self, swimmer_id, meet_id):
        signup = MeetSignup.query.filter_by(swimmer_id=swimmer_id, meet_id=meet_id).first()
        db.session.delete(signup)
        db.session.commit()
        return "", 204
    
class AddMeetSignupResource(Resource):
    @jwt_required()
    def post(self):
        form_data = request.get_json()
        new_meet_signup = meet_signup_schema.load(form_data)
        db.session.add(new_meet_signup)
        db.session.commit()
        return meet_signup_schema.dump(new_meet_signup), 201