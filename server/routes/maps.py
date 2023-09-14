from flask_restful import Resource
from flask import request, session

from models.models import Map
from config import api, db

class Maps(Resource):
    def get(self):
        list = []

        for map in Map.query.all():
            map_obj = map.to_dict()
            list.append(map_obj)

        return list, 200
    
api.add_resource(Maps, "/maps")