from flask import Flask
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_cors import CORS

from .config import Config

socketio = SocketIO()
class Base(DeclarativeBase):
  pass
db = SQLAlchemy(model_class=Base)
cors = CORS()


def create_app(config=Config):
    app = Flask(__name__)
    app.config.from_object(config)
    
    socketio.init_app(app, cors_allowed_origins='*')
    db.init_app(app)
    cors.init_app(app, resources='*')
    
    import src.sockets
    from src.endpoints import endpoints

    app.register_blueprint(endpoints)

    return app
