from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Parent
from database.schemas import parent_schema, parents_schema
from marshmallow import ValidationError

class ParentsResource(Resource):
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_parent = parent_schema.load(form_data)
            db.session.add(new_parent)
            db.session.commit()
            return parent_schema.dump(new_parent), 201
        except ValidationError as err:
            return err.messages, 400

class ParentResource(Resource):
    @jwt_required()
    def get(self, parent_id):
        try:
            verify_jwt_in_request()
            parent = Parent.query.get_or_404(parent_id)
            return parent_schema.dump(parent), 200
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def delete(self, parent_id):
        try:
            verify_jwt_in_request()
            parent = Parent.query.get_or_404(parent_id)
            db.session.delete(parent)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400
        
    @jwt_required()
    def put(self, parent_id):
        try:
            verify_jwt_in_request()
            parent = Parent.query.get_or_404(parent_id)

            if 'last_name' in request.json:
                parent.last_name = request.json['last_name']
            if 'first_name' in request.json:
                parent.first_name = request.json['first_name']
            if 'address_id' in request.json:
                parent.address_id = request.json['address_id']
            if 'email' in request.json:
                parent.email = request.json['email']
            if 'phone' in request.json:
                parent.phone = request.json['phone']

            db.session.commit()
            return parent_schema.dump(parent), 200
        except ValidationError as err:
            return err.messages, 400