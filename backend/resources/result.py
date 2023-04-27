from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Result
from database.schemas import result_schema, results_schema
from marshmallow import ValidationError

class ResultsResource(Resource):
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_result = result_schema.load(form_data)
            db.session.add(new_result)
            db.session.commit()
            return result_schema.dump(new_result), 201
        except ValidationError as err:
            return err.messages, 400
        
class ResultResource(Resource):
    @jwt_required()
    def get(self, result_id):
        try:
            verify_jwt_in_request()
            result = Result.query.get_or_404(result_id)
            return result_schema.dump(result), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def delete(self, result_id):
        try:
            verify_jwt_in_request()
            result = Result.query.get_or_404(result_id)
            db.session.delete(result)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def put(self, result_id):
        try:
            verify_jwt_in_request()
            result = Result.query.get_or_404(result_id)

            if 'entry_id' in request.json:
                result.entry_id = request.json['entry_id']
            if 'time' in request.json:
                result.time = request.json['time']
            if 'place' in request.json:
                result.place = request.json['place']
            if 'points' in request.json:
                result.points = request.json['points']
            if 'DQCode' in request.json:
                result.DQCode = request.json['DQCode']
            if 'swimmer1' in request.json:
                result.swimmer1 = request.json['swimmer1']
            if 'swimmer2' in request.json:
                result.swimmer2 = request.json['swimmer2']
            if 'swimmer3' in request.json:
                result.swimmer3 = request.json['swimmer3']
            if 'swimmer4' in request.json:
                result.swimmer4 = request.json['swimmer4']

            db.session.commit()
            return result_schema.dump(result), 200
        except ValidationError as err:
            return err.messages, 400