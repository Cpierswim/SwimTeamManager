from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Relay
from database.schemas import relay_schema, relays_schema
from marshmallow import ValidationError

class RelaysResource(Resource):
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_relay = relay_schema.load(form_data)
            db.session.add(new_relay)
            db.session.commit()
            return relay_schema.dump(new_relay), 201
        except ValidationError as err:
            return err.messages, 400
                
class RelayResource(Resource):
    @jwt_required()
    def get(self, relay_id):
        try: 
            verify_jwt_in_request()
            relay = Relay.query.get_or_404(relay_id)
            return relay_schema.dump(relay), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def delete(self, relay_id):
        try:
            verify_jwt_in_request()
            relay = Relay.query.get_or_404(relay_id)
            db.session.delete(relay)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def put(self, relay_id):
        try:
            verify_jwt_in_request()
            relay = Relay.query.get_or_404(relay_id)

            if 'relay_identifier' in request.json:
                relay.relay_identifier = request.json['relay_identifier']
            if 'swimmer1' in request.json:
                relay.swimmer1 = request.json['swimmer1']
            if 'swimmer2' in request.json:
                relay.swimmer2 = request.json['swimmer2']
            if 'swimmer3' in request.json:
                relay.swimmer3 = request.json['swimmer3']
            if 'swimmer4' in request.json:
                relay.swimmer4 = request.json['swimmer4']

            db.session.commit()
            return relay_schema.dump(relay), 200
        except ValidationError as err:
            return err.messages, 400