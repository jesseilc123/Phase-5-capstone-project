from flask_restful import Resource
from flask import request, session

from models.models import Pikmin
from config import api, db

class Pikmins(Resource):
    def get(self):
        list = []

        for pikmin in Pikmin.query.all():
            pik_obj = pikmin.to_dict()
            list.append(pik_obj)

        return list, 200
    
api.add_resource(Pikmins, "/pikmins")