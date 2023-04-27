from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    type = db.Column(db.Integer, nullable=False)
    family_id = db.Column(db.Integer, nullable=True)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username
    
class Team(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    team_name = db.Column(db.String(255), nullable=False)
    abbreviation = db.Column(db.String(4), nullable=False)

    def __repr__(self):
        return self.team_name
    
class Swimmer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    preferred_first_name = db.Column(db.String(25), nullable=True)
    middle_name = db.Column(db.String(100), nullable=True)
    birthdate = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=True)
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    team = db.relationship("Team")
    group = db.relationship("Group")
    address = db.relationship("Address")
    
    def __repr__(self):
        return self.preferred_first_name + " " + self.last_name

class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    address = db.relationship("Address")

    def __repr__(self):
        return "Parent: " + self.first_name + " " + self.last_name
    
class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address_line_one = db.Column(db.String(255), nullable=False)
    address_line_two = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zipcode = db.Column(db.String(10), nullable=False)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return self.address_line_one + ", " + self.city
    
class Coach(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    isHeadCoach = db.Column(db.Boolean, nullable=False, default=False)
    last_name = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    team = db.relationship("Team")

    def __repr__(self):
        return "Coach " + self.first_name + " " + self.last_name

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(255), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    team = db.relationship("Team")

    def __repr__(self):
        return self.group_name
    
class Meet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'), nullable=False)
    location_name = db.Column(db.String(255), nullable=True)
    date = db.Column(db.Date, nullable=False)
    age_up_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=True)
    name = db.Column(db.String(255), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), nullable=False)
    address = db.relationship("Address")
    team = db.relationship("Team")
    
    def __repr__(self):
        return self.name
    
class MeetEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    distance = db.Column(db.Integer, nullable=False)
    stroke = db.Column(db.Integer, nullable=False)
    min_age = db.Column(db.Integer, nullable=True)
    max_age = db.Column(db.Integer, nullable=True)
    meet_id = db.Column(db.Integer, db.ForeignKey('meet.id'), nullable=False)
    event_type = db.Column(db.String(1), nullable=False)
    event_number = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    meet = db.relationship("Meet")

    def __repr__(self):
        return "Meet " + self.meet_id + " " + self.distance + " " + self.stroke + " " + self.min_age + "-" + self.max_age
    
class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('meet_event.id'), nullable=False)
    swimmer_id = db.Column(db.Integer, db.ForeignKey('swimmer.id'), nullable=True)
    time = db.Column(db.Integer, nullable=True)
    exhibition = db.Column(db.Boolean, nullable=False, default=False)
    bonus = db.Column(db.Boolean, nullable=False, default=False)
    entry_type = db.Column(db.String(1), nullable=False)
    relay_id = db.Column(db.Integer, db.ForeignKey('relay.id'), nullable=True)
    relay = db.relationship("Relay")
    meet_event = db.relationship("MeetEvent")
    swimmer = db.relationship("Swimmer")

    def __repr__(self):
        return self.id

class Relay(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    relay_identifier = db.Column(db.String(2), nullable=False)
    swimmer1 = db.Column(db.Integer, nullable=True)
    swimmer2 = db.Column(db.Integer, nullable=True)
    swimmer3 = db.Column(db.Integer, nullable=True)
    swimmer4 = db.Column(db.Integer, nullable=True)
    
    def __repr__(self):
        return self.relay_identifier
    
class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entry_id = db.Column(db.Integer, db.ForeignKey('entry.id'), nullable=False)
    time = db.Column(db.Integer, nullable=True)
    place = db.Column(db.Integer, nullable=True)
    points = db.Column(db.Integer, nullable=True)
    DQCode = db.Column(db.String(3), nullable=True)
    swimmer1 = db.Column(db.Integer, nullable=True)
    swimmer2 = db.Column(db.Integer, nullable=True)
    swimmer3 = db.Column(db.Integer, nullable=True)
    swimmer4 = db.Column(db.Integer, nullable=True)
    meet_event = db.relationship("Entry")

    def __repr__(self):
        return self.time

class Family(db.Model):
    relationship_id = db.Column(db.Integer, primary_key=True)
    family_id = db.Column(db.Integer, nullable=False)
    parent_id = db.Column(db.Integer, nullable=True)
    swimmer_id = db.Column(db.Integer, nullable=True)

class GroupCoach(db.Model):
    group_id = db.Column(db.Integer, primary_key=True)
    coach_id = db.Column(db.Integer, primary_key=True)