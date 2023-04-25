from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import *

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    type = fields.Integer(required=True)
    family_id = fields.Integer(required=True)
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email", "type", "family_id")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    type = fields.Integer(required=True)
    family_id = fields.Integer(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email",)

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)


'''# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)'''


# TODO: Add your schemas below

'''class TeamSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    team_name = fields.String(required=True)
    abbreviation = fields.String(required=True)
    class Meta:
        fields = ("id", "team_name", "abbreviation")

    @post_load
    def create_team(self, data, **kwargs):
        return Team(**data)

class SwimmerSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    preferred_first_name = fields.String(required=False)
    middle_name = fields.String(required=False)
    birthdate = fields.Date(required=True)
    gender = fields.String(required=True)
    group_id = fields.Integer(required=False)
    address_id = fields.Integer(required=True)
    team_id = fields.Integer(required=True)

class ParentSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    last_name = fields.String(required=True)
    first_name = fields.String(required=True)
    address_id = fields.Integer(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    
class CoachSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    isHeadCoach = fields.Boolean(required=True)
    last_name = fields.String(required=True)
    first_name = fields.String(required=True)
    team_id = fields.Integer(required=True)

class GroupSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    group_name = fields.String(required=True)
    team_id = fields.Integer(required=True)

class Meet(ma.Schema):
    pass'''