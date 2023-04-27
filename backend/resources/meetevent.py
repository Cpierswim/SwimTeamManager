from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, MeetEvent
from database.schemas import meet_event_schema, meet_events_schema
from marshmallow import ValidationError

class MeetEventsResource(Resource):
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_meetevent = meet_event_schema.load(form_data)
            db.session.add(new_meetevent)
            db.session.commit()
            return meet_event_schema.dump(new_meetevent), 201
        except ValidationError as err:
            return err.messages, 400
    
    @jwt_required()
    def get(self):
        try:
            verify_jwt_in_request()
            meet_id = request.args.get('meet_id')
            if(not meet_id):
                return "meet_id required", 400
            meetevents = MeetEvent.query.filter_by(meet_id=meet_id)
            return meet_events_schema.dump(meetevents), 200
        except ValidationError as err:
            return err.messages, 400

        
class MeetEventResource(Resource):
    @jwt_required()
    def get(self, meetevent_id):
        try:
            verify_jwt_in_request()
            meetevent = MeetEvent.query.get_or_404(meetevent_id)
            return meet_event_schema.dump(meetevent), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def delete(self, meetevent_id):
        try:
            verify_jwt_in_request()
            meetevent = MeetEvent.query.get_or_404(meetevent_id)
            db.session.delete(meetevent)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def put(self, meetevent_id):
        try:
            verify_jwt_in_request()
            meetevent = MeetEvent.query.get_or_404(meetevent_id)

            if 'distance' in request.json:
                meetevent.distance = request.json['distance']
            if 'stroke' in request.json:
                meetevent.stroke = request.json['stroke']
            if 'min_age' in request.json:
                meetevent.min_age = request.json['min_age']
            if 'max_age' in request.json:
                meetevent.max_age = request.json['max_age']
            if 'event_type' in request.json:
                meetevent.event_type = request.json['event_type']
            if 'event_number' in request.json:
                meetevent.event_number = request.json['event_number']
            if 'gender' in request.json:
                meetevent.gender = request.json['gender']

            db.session.commit()
            return meet_event_schema.dump(meetevent), 200
        except ValidationError as err:
            return err.messages, 400