from flask_restful import Resource
from flask import request, session

from models.models import User
from config import api, db

class Users(Resource):
    def get(self):
        list = []

        for user in User.query.all():
            user_obj = user.to_dict()
            list.append(user_obj)

        return list, 200
    
api.add_resource(Users, "/users")