from flask_restful import Resource
from flask import request, session

from models.models import Character
from config import api, db

class Characters(Resource):
    def get(self):
        list = []

        for character in Character.query.all():
            char_obj = character.to_dict()
            list.append(char_obj)

        return list, 200
    
api.add_resource(Characters, "/characters")