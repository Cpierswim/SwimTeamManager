from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Result
from database.schemas import result_schema, results_schema
from marshmallow import ValidationError
import mysql.connector
from dotenv import load_dotenv
from os import environ
from sqlalchemy import select

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
        
class SwimmerBestTimesResource(Resource):
    @jwt_required()
    def get(self, swimmer_id):
        # result = Result.query.get_or_404(swimmer1=swimmer_id).group_by()
        load_dotenv()
        DATABASE_USER = environ.get('DATABASE_USER')
        DATABASE_PASSWORD = environ.get('DATABASE_PASSWORD')
        DATABASE_LOCATION = environ.get('DATABASE_LOCATION')
        DATABASE_NAME = environ.get('DATABASE_NAME')

        mydb = mysql.connector.connect(
            host=DATABASE_LOCATION,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            database=DATABASE_NAME
        )

        c = mydb.cursor()
        statement = f"SELECT min(time), swimmer1, distance, stroke FROM swim_team_manager.Result WHERE DQCode IS NULL AND swimmer1 = {swimmer_id} GROUP BY distance, stroke, swimmer1 ORDER BY swimmer1, distance, stroke;"
        c.execute(statement)
        result = c.fetchall()

        best_times = []
        for line in result:
            best_time = {
                'time': line[0],
                'swimmer_id': line[1],
                'distance': line[2],
                'stroke': line[3]
            }
            best_times.append(best_time)

        return best_times, 200
    
class TeamBestTimeResource(Resource):
    #TODO: Set this to actually search by team instead of just the entire database

    @jwt_required()
    def get(self):
        # result = Result.query.get_or_404(swimmer1=swimmer_id).group_by()
        load_dotenv()
        DATABASE_USER = environ.get('DATABASE_USER')
        DATABASE_PASSWORD = environ.get('DATABASE_PASSWORD')
        DATABASE_LOCATION = environ.get('DATABASE_LOCATION')
        DATABASE_NAME = environ.get('DATABASE_NAME')

        mydb = mysql.connector.connect(
            host=DATABASE_LOCATION,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            database=DATABASE_NAME
        )

        c = mydb.cursor()
        statement = f"SELECT min(time), swimmer1, distance, stroke FROM swim_team_manager.Result WHERE DQCode IS NULL GROUP BY distance, stroke, swimmer1 ORDER BY swimmer1, distance, stroke, swimmer1;"
        c.execute(statement)
        result = c.fetchall()

        best_times = []
        for line in result:
            best_time = {
                'time': line[0],
                'swimmer_id': line[1],
                'distance': line[2],
                'stroke': line[3]
            }
            best_times.append(best_time)

        return best_times, 200
