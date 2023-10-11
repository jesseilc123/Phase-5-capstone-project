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
    
    def delete(self):
        post = Post.query.filter(Post.id == request.get_json()["id"]).first()

        db.session.delete(post)
        db.session.commit()

        return {"message": "post successfully deleted"}, 200
    
    def patch(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Unauthorized"}, 401
        id = request.get_json()["id"]

        post = Post.query.filter(Post.id == id).first()

        setattr(post, "title", request.get_json()["title"])
        setattr(post, "body", request.get_json()["body"])
        setattr(post, "category", request.get_json()["category"])
        
        db.session.add(post)
        db.session.commit()

        return post.to_dict(), 201 
    
api.add_resource(Posts, "/posts")