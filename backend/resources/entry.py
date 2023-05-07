from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Entry
from database.schemas import entry_schema, entries_schema
from marshmallow import ValidationError

class EntriesResource(Resource):
    # @jwt_required()
    def post(self):
        try:
            # verify_jwt_in_request()
            form_data = request.get_json()
            new_entry = entry_schema.load(form_data)
            db.session.add(new_entry)
            db.session.commit()
            return entry_schema.dump(new_entry), 201
        except ValidationError as err:
            return err.messages, 400
        
    def get(self):
        try:
            event_id = request.args.get('event_id')
            swimmer_id = request.args.get('swimmer_id')
            entries = None
            if (event_id and swimmer_id):
                entries = Entry.query.filter_by(event_id=event_id, swimmer_id=swimmer_id).first()
                return entry_schema.dump(entries), 200
            if(not event_id and not swimmer_id):
                return "event_id or swimmer_id required", 400
            if(event_id):
                entries = Entry.query.filter_by(event_id=event_id)
            if(swimmer_id):
                entries = Entry.query.filter_by(swimmer_id=swimmer_id)
            return entries_schema.dump(entries), 200
        except ValidationError as err:
            return err.messages, 400

class EntryResource(Resource):
    @jwt_required()
    def get(self, entry_id):
        try:
            verify_jwt_in_request()
            entry = Entry.query.get_or_404(entry_id)
            return entry_schema.dump(entry), 200
        except ValidationError as err:
            return err.messages, 400
    
    @jwt_required()
    def put(self, entry_id):
        try:
            verify_jwt_in_request()
            entry = Entry.query.get_or_404(entry_id)

            if 'time' in request.json:
                entry.time = request.json['time']
            if 'exhibition' in request.json:
                entry.exhibition = request.json['exhibition']
            if 'bonus' in request.json:
                entry.bonus = request.json['bonus']

            db.session.commit()
            return entry_schema.dump(entry), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def delete(self, entry_id):
        try:
            verify_jwt_in_request()
            entry = Entry.query.get_or_404(entry_id)
            db.session.delete(entry)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400
            
class EntryWorkAroundResource(Resource):
    def post(self):
        form_data = request.get_json()
        new_entry = entry_schema.load(form_data)
        db.session.add(new_entry)
        db.session.commit()
        return entry_schema.dump(new_entry), 201