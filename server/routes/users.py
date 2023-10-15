from flask_restful import Resource
from flask import request, session
from sqlalchemy.exc import IntegrityError 

from models.models import User
from config import api, db

class CheckSession(Resource):

    def get(self):
        user_id = session.get("user_id")
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {}, 401
        
class Users(Resource):
    def get(self):
        list = []

        for user in User.query.all():
            user_obj = user.to_dict()
            list.append(user_obj)

        return list, 200
    
class Login(Resource):

    def post(self):
        email = request.get_json()['email']
        user = User.query.filter(User.email == email).first()

        password = request.get_json()['password']
        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200
            return {"error": "Invalid password"}, 401
        return {"error": "Invalid email"}, 401

class Signup(Resource): 
    
    def post(self):
        user = User(
            email=request.get_json()["email"],
            username=request.get_json()["username"],
        )
        user.password_hash = request.get_json()["password"]
        try:
            db.session.add(user)
            db.session.commit()
            session["user_id"] = user.id
            print(session["user_id"])

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