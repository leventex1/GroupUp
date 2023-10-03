from flask import request
from flask_socketio import send, emit, join_room, leave_room
from datetime import datetime
from src import socketio, db
from src.models import Message


@socketio.on('connect')
def test_connect():
    print('Client connected', request.sid)

@socketio.on('disconnect')
def test_connect():
    print('Client disconnected', request.sid)

@socketio.on('join')
def on_join():
    print('Client joined', request.sid)
    join_room('first_room')

@socketio.on('leave')
def on_leave():
    print('Client left', request.sid)
    leave_room('first_room')

@socketio.on('push message')
def on_push_message(message: str, username: str):
    
    print('Client pushed message', request.sid, message)

    new_message = Message(
        message=message,
        username=username
    )

    db.session.add(new_message)
    db.session.commit()

    emit('pull message', to='first_room')
    
