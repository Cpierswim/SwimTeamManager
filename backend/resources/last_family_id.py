from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, LastFamilyID
from database.schemas import last_family_id_schema
from marshmallow import ValidationError

class LastFamilyIDResource(Resource):  
    def get(self):
        last_id = LastFamilyID.query.get_or_404(1)
        return last_family_id_schema.dump(last_id), 200
    
    def put(self):
        last_id = LastFamilyID.query.get_or_404(1)

        last_id.last_family_id = last_id.last_family_id + 1
        db.session.commit()
        return last_family_id_schema.dump(last_id), 200