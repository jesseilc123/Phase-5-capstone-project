from flask_restful import Resource
from flask import request, session

from models.models import Enemy
from config import api, db

class Enemies(Resource):
    def get(self):
        list = []

        for enemy in Enemy.query.all():
            enemy_obj = enemy.to_dict()
            list.append(enemy_obj)

        return list, 200
    
api.add_resource(Enemies, "/enemies")