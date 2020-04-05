import os
import logging
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_admin import Admin
from flask import Flask
from flask_login import LoginManager
from flask_limiter.util import get_remote_address
from flask_limiter import Limiter

DB = SQLAlchemy()
MA = Marshmallow()
admin = Admin(template_mode='bootstrap3')
login_manager = LoginManager()
logging.basicConfig(level=logging.DEBUG)

def create_app():
	app = Flask(__name__)
	DB.init_app(app)
	MA.init_app(app)
	admin.init_app(app)
	login_manager.init_app(app)
	return app


def set_environment():
	if os.environ['FLASK_ENV'] == 'dev':
		app.config.from_object('sweb_backend.config.Config')
		app.logger.info(app.config['SQLALCHEMY_DATABASE_URI'])
	else:
		app.config.from_object('sweb_backend.config.Production')
		app.logger.info(app.config['SQLALCHEMY_DATABASE_URI'])


def create_tables():
	with app.app_context():
		from sweb_backend import models
		from sweb_backend.admin import pflanzlistetable, obstsortentable, imagetable
		admin.add_view(imagetable(models.Image, DB.session))
		admin.add_view(pflanzlistetable(models.Pflanzliste, DB.session))
		admin.add_view(obstsortentable(models.Sorten, DB.session))

def register_all_blueprints():
	from sweb_backend.login import admin_login
	from sweb_backend.api import api
	app.register_blueprint(admin_login)
	app.register_blueprint(api)


app = create_app()
limiter = Limiter(
	app,
	key_func=get_remote_address,
	default_limits=['200 per day']
)
set_environment()
create_tables()
register_all_blueprints()
