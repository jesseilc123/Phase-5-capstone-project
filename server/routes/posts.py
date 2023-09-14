from flask_restful import Resource
from flask import request, session

from models.models import Post
from config import api, db

class Posts(Resource):
    def get(self):
        list = []

        for post in Post.query.all():
            post_obj = post.to_dict()
            list.append(post_obj)

        return list, 200
    
api.add_resource(Posts, "/posts")