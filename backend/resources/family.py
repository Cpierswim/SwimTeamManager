from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Family, Swimmer, Parent
from database.schemas import families_schema, family_schema, swimmers_schema, parents_schema
from marshmallow import ValidationError

class FamiliesResource(Resource):
    @jwt_required()
    def post(self):
        try:
            verify_jwt_in_request()
            form_data = request.get_json()
            new_family = family_schema.load(form_data)
            db.session.add(new_family)
            db.session.commit()
            return family_schema.dump(new_family), 201
        except ValidationError as err:
            return err.messages, 400
        
    #@jwt_required()
    def get(self):
        try:
            family_id = request.args.get('family_id')
            if(not family_id):
                return "family_id required", 400
            
            swimmers = Swimmer.query.filter_by(family_id=family_id)
            parents = Parent.query.filter_by(family_id=family_id)
            swimmers = swimmers_schema.dump(swimmers)
            parents = parents_schema.dump(parents)
            return_info = {
                'parents': parents,
                'swimmers': swimmers
            }

            return return_info, 200
        except ValidationError as err:
            return err.messages, 400
        
class FamilyResource(Resource):
    """
    @jwt_required()
    def get(self, relationship_id):
        try:
            verify_jwt_in_request()
            family = Family.query.get_or_404(relationship_id)
            return family_schema.dump(family), 200
        except ValidationError as err:
            return err.messages, 400
    """
        
    @jwt_required()
    def delete(self, relationship_id):
        try:
            verify_jwt_in_request()
            family = Family.query.get_or_404(relationship_id)
            db.session.delete(family)
            db.session.commit()
            return "", 204
        except ValidationError as err:
            return err.messages, 400

    '''   
    @jwt_required()
    def put(self, relationship_id):
        try:
            verify_jwt_in_request()
            family = Family.query.get_or_404(relationship_id)

            if 'family_id' in request.json:
                family.family_id = request.json['family_id']
            if 'parent_id' in request.json:
                family.parent_id = request.json['parent_id']
            if 'swimmer_id' in request.json:
                family.swimmer_id = request.json['swimmer_id']

            db.session.commit()
            return family_schema.dump(family), 200
        except ValidationError as err:
            return err.messages, 400
    '''
