from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from database.models import db
from database.schemas import ma
from resources.auth import LoginResource, RegisterResource
from resources.team import TeamResource, TeamsResource
from resources.groups import GroupsResource, GroupResource
from resources.address import AddressResource, AddressesResource
from resources.swimmers import SwimmerResource, SwimmersResource
from resources.parent import ParentResource, ParentsResource
from resources.coach import CoachesResource, CoachResource
from resources.meet import MeetResource, MeetsResource
from resources.meetevent import MeetEventResource, MeetEventsResource
from dotenv import load_dotenv
from os import environ

# Adds variables from .env file to environment
load_dotenv()

# Creates instances of additional libraries
bcrypt = Bcrypt()
jwt= JWTManager()
cors = CORS()
migrate = Migrate()

def create_app():
    """
    App factory that creates app instance
    """
    # Creates app instance
    app = Flask(__name__)

    # Loads config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')

    # Registers all routes with API
    api = create_routes()

    # Registers Flask app with additional libraries created/imported above
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)

    return app


def create_routes():
    """
    Creates Flask Restful instance and registers all Resource routes
    """
    api = Api()
    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(TeamResource, '/api/team/<int:team_id>')
    api.add_resource(TeamsResource, '/api/teams/')
    api.add_resource(GroupsResource, '/api/groups/')
    api.add_resource(GroupResource, '/api/group/<int:group_id>')
    api.add_resource(AddressResource, '/api/address/<int:address_id>')
    api.add_resource(AddressesResource, '/api/address/')
    api.add_resource(SwimmerResource, '/api/swimmer/<int:swimmer_id>')
    api.add_resource(SwimmersResource, '/api/swimmer/')
    api.add_resource(ParentResource, '/api/parent/<int:parent_id>')
    api.add_resource(ParentsResource, '/api/parent/')
    api.add_resource(CoachResource, '/api/coach/<int:coach_id>')
    api.add_resource(CoachesResource, '/api/coach/')
    api.add_resource(MeetResource, '/api/meet/<int:meet_id>')
    api.add_resource(MeetsResource, '/api/meet/')
    api.add_resource(MeetEventResource, '/api/meetevent/<int:meetevent_id>')
    api.add_resource(MeetEventsResource, '/api/meetevent/')

    return api
