from flask_restful import Resource
from flask import request, session

from models.models import User
from config import api, db

class CheckSession(Resource):

    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {"message": "Unauthorized"}, 401
        
class Users(Resource):
    def get(self):
        list = []

        for user in User.query.all():
            user_obj = user.to_dict()
            list.append(user_obj)

        return list, 200
    
class Login(Resource):

    def post(self):
        username = request.get_json().get('username')
        user = user = User.query.filter(User.username == username).first()

        password = username = request.get_json().get('password')
        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200
            return {"error": "Invalid password"}, 401
        return {"error": "Invalid username"}, 401

class Signup(Resource): 
    
    def post(self):
        user = User(
            username=request.get_json()["username"],
        )
        user.password_hash = request.get_json()["password"]
        try:
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id

            return user.to_dict(), 201
        except IntegrityError:
            return {"message": "Username must be unique"}, 422
        
    
class Logout(Resource):

    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(CheckSession, "/check_session")
api.add_resource(Users, "/users")
api.add_resource(Login, "/login")
api.add_resource(Signup, "/signup")
api.add_resource(Logout, "/logout")