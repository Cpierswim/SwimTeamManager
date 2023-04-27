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
    family_id = fields.Integer(required=False)
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

class TeamSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    team_name = fields.String(required=True)
    abbreviation = fields.String(required=True)
    class Meta:
        fields = ("id", "team_name", "abbreviation")

    @post_load
    def create_team(self, data, **kwargs):
        return Team(**data)
    
team_schema = TeamSchema()

class GroupSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    group_name = fields.String(required=True)
    team_id = fields.Integer(required=True)

    class Meta:
        fields = ("id", "group_name", "team_id")

    @post_load
    def create_group(self, data, **kwargs):
        return Group(**data)
    
group_schema = GroupSchema()
groups_schema = GroupSchema(many=True)

class AddressSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    address_line_one = fields.String(required=True)
    address_line_two = fields.String(required=False)
    city = fields.String(required=True)
    state = fields.String(required=True)
    zipcode = fields.String(required=True)
    latitude = fields.Float(required=False)
    longitude = fields.Float(required=False)

    class Meta:
        fields = ("id", "address_line_one", "address_line_two", "city",
                  "state", "zipcode", "latitude", "longitude")
        
    @post_load
    def create_address(self, data, **kwargs):
        return Address(**data)
    
address_schema = AddressSchema()
addressses_schema = AddressSchema(many=True)

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
    group = ma.Nested(GroupSchema, many=False)
    team = ma.Nested(TeamSchema, many=False)
    addresses = ma.Nested(AddressSchema, many=True)

    class Meta:
        fields = ("id", "first_name", "last_name", "preferred_first_name", 
                  "middle_name", "birthdate", "gender", "group_id", 
                  "address_id", "team_id", "group", "team", "addresses")
        
    @post_load
    def create_swimmer(self, data, **kwargs):
        return Swimmer(**data)
    
swimmer_schema = SwimmerSchema()
swimmers_schema = SwimmerSchema(many=True)

class ParentSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    last_name = fields.String(required=True)
    first_name = fields.String(required=True)
    address_id = fields.Integer(required=True)
    email = fields.String(required=True)
    phone = fields.String(required=True)
    address = ma.Nested(AddressSchema, many=False)

    class Meta:
        fields = ("id", "last_name", "first_name", "address_id", "email", 
                  "phone", "address")

    @post_load
    def create_parent(self, data, **kwargs):
        return Parent(**data)

parent_schema = ParentSchema()
parents_schema = ParentSchema(many=True)
    
class CoachSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    isHeadCoach = fields.Boolean(required=True)
    last_name = fields.String(required=True)
    first_name = fields.String(required=True)
    team_id = fields.Integer(required=True)
    team = ma.Nested(TeamSchema, many=False)

    class Meta:
        fields = ("id", "isHeadCoach", "last_name", "first_name", "team_id", "team")

    @post_load
    def create_coach(self, data, **kwargs):
        return Coach(**data)

coach_schema = CoachSchema()
coaches_schema = CoachSchema(many=True)

class MeetSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    address_id = fields.Integer(required=True)
    location_name = fields.String(required=False)
    date = fields.Date(required=True)
    age_up_date = fields.Date(required=True)
    start_time = fields.Time(required=False)
    name = fields.String(required=True)
    team_id = fields.Integer(required=True)
    address = ma.Nested(AddressSchema, many=False)
    team = ma.Nested(TeamSchema, many=False)

    class Meta:
        fields = ("id", "address_id", "location_name", "date", "age_up_date", 
                  "start_time", "name", "address", "team_id")
        
    @post_load
    def create_meet(self, data, **kwargs):
        return Meet(**data)
    
meet_schema = MeetSchema()
meets_schema = MeetSchema(many=True)

class MeetEventSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    distance = fields.Integer(required=True)
    stroke = fields.Integer(required=True)
    min_age = fields.Integer(required=False)
    max_age = fields.Integer(required=False)
    meet_id = fields.Integer(required=True)
    event_type = fields.Integer(required=True)
    event_number = fields.Integer(required=True)
    gender = fields.String(required=True)
    meet = ma.Nested(MeetSchema, many=False)

    class Meta:
        fields = ("id", "distance", "stroke", "min_age", "max_age", 
                  "meet_id", "event_type", "event_number", "meet", 
                  "gender")
        
    @post_load
    def create_meet_event(self, data, **kwargs):
        return MeetEvent(**data)
    
meet_event_schema = MeetEventSchema()
meet_events_schema = MeetEventSchema(many=True)

class RelaySchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    relay_identifier = fields.String(required=True)
    swimmer1 = fields.Integer(required=False)
    swimmer2 = fields.Integer(required=False)
    swimmer3 = fields.Integer(required=False)
    swimmer4 = fields.Integer(required=False)

    class Meta:
        fields = ("id", "relay_identifier", "swimmer1", "swimmer2", 
                  "swimmer3", "swimmer4")
        
    @post_load
    def create_relay(self, data, **kwargs):
        return Relay(**data)
    
relay_schema = RelaySchema()
relays_schema = RelaySchema(many=True)

class EntrySchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    event_id = fields.Integer(required=True)
    swimmer_id = fields.Integer(required=False)
    time = fields.Integer(required=False)
    exhibition = fields.Boolean(required=True)
    bonus = fields.Boolean(required=True)
    entry_type = fields.String(required=True)
    relay_id = fields.Integer(required=False)
    relay = ma.Nested(RelaySchema, many=False)
    meet_event = ma.Nested(MeetEventSchema, many=False)
    swimmer = ma.Nested(SwimmerSchema, many=False)

    class Meta:
        fields = ("id", "event_id", "swimmer_id", "time", "exhibition", 
                  "bonus", "entry_type", "relay_id", "relay", "meet_event", 
                  "swimmer")
        
    @post_load
    def create_entry(self, data, **kwargs):
        return Entry(**data)
    
entry_schema = EntrySchema()
entries_schema = EntrySchema(many=True)

class ResultSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    entry_id = fields.Integer(required=True)
    time = fields.Integer(required=False)
    place = fields.Integer(required=False)
    points = fields.Integer(required=False)
    DQCode = fields.String(required=False)
    swimmer1 = fields.Integer(required=False)
    swimmer2 = fields.Integer(required=False)
    swimmer3 = fields.Integer(required=False)
    swimmer4 = fields.Integer(required=False)
    meet_event = ma.Nested(MeetEventSchema, many=False)

    class Meta:
        fields = ("id", "entry_id", "time", "place", "points", "DQCode", 
                  "swimmer1", "swimmer2", "swimmer3", "swimmer4", 
                  "meet_event")
        
    @post_load
    def create_result(self, data, **kwargs):
        return Result(**data)
    
result_schema = ResultSchema()
results_schema = ResultSchema(many=True)
    
class FamilySchema(ma.Schema):
    relationship_id = fields.Integer(primary_key=True)
    family_id = fields.Integer(required=True)
    parent_id = fields.Integer(required=False)
    swimmer_id = fields.Integer(required=False)

    class Meta:
        fields = ("relationship_id", "family_id", "parent_id", 
                  "swimmer_id")
        
    @post_load
    def create_family(self, data, **kwargs):
        return Family(**data)
    
family_schema = FamilySchema()
families_schema = FamilySchema(many=True)

class GroupCoachSchema(ma.Schema):
    group_id = fields.Integer(primary_key=True)
    coach_id = fields.Integer(primary_key=True)
    group = ma.Nested(GroupSchema)
    coach = ma.Nested(CoachSchema)

    class Meta:
        fields = ("group_id", "coach_id", "group", "coach")

    @post_load
    def create_group_coach(self, data, **kwargs):
        return GroupCoach(**data)
    
group_coach_schema = GroupCoachSchema()
group_coaches_schema = GroupCoachSchema(many=True)