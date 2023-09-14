from flask_restful import Resource
from flask import request, session

from models.models import Reply
from config import api, db

class Replies(Resource):
    def get(self):
        list = []

        for reply in Reply.query.all():
            rep_obj = reply.to_dict()
            list.append(rep_obj)

        return list, 200
    
api.add_resource(Replies, "/replies")