from flask import Blueprint
from src import db
from src.models import Message

endpoints = Blueprint('endpoints', __name__)

@endpoints.get('/api/message')
def pull_messages():

    messages: [Message] = db.session.execute(db.select(Message).order_by(Message.created_at)).scalars()

    return [{
        'id': message.public_id,
        'message': message.message,
        'username': message.username,
        'created_at': message.created_at
    } for message in messages], 200