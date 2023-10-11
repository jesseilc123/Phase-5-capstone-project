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
    
    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return {"message": "Unauthorized"}, 401
        new_reply = Reply(
           content=request.get_json()["content"],
           post_id=request.get_json()["post_id"]
        )
        new_reply.user_id = user_id

        db.session.add(new_reply)
        db.session.commit()

        return new_reply.to_dict(), 201
    
    def delete(self):
        reply = Reply.query.filter(Reply.id == request.get_json()["id"]).first()

        db.session.delete(reply)
        db.session.commit()

        return {"message": "reply successfully deleted"}, 200

    
api.add_resource(Replies, "/replies")