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
    
    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Unauthorized"}, 401
        new_post = Post(
            title=request.get_json()["title"],
            body=request.get_json()["body"],
            category=request.get_json()["category"],
            user_id=user_id,
        )

        db.session.add(new_post)
        db.session.commit()

        return new_post.to_dict(), 201
    
api.add_resource(Posts, "/posts")