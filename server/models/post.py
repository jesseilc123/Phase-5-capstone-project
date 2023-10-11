from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    serialize_rules = ( '-user', '-post.replies')

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    replies = db.relationship("Reply", cascade="all, delete", backref="post")

    def __repr__(self):
        return f"Post(id={self.id}, " + \
            f"title={self.title}, " + \
            f"body={self.body}, " + \
            f"user_id={self.user_id})"