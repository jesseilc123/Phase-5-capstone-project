from flask_restful import Resource
from flask import request, session

from models.models import Treasure
from config import api, db

class Treasures(Resource):
    def get(self):
        list = []

        for treasure in Treasure.query.all():
            tre_obj = Treasure.to_dict()
            list.append(tre_obj)

        return list, 200
    
api.add_resource(Treasures, "/treasures")