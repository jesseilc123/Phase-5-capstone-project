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

    @validates("title")
    def check_content(self, key, title):
        if (not title):
            raise ValueError({"message": "Title must exist"})
        return title
        
    @validates("body")
    def check_body(self, key, body):
        if (not body):
            raise ValueError({"message": "Body must exist"})
        return body
        
    @validates("category")
    def check_category(self, key, category):
        if (not category):
            raise ValueError({"message": "Category must exist"})
        return category

    def __repr__(self):
        return f"Post(id={self.id}, " + \
            f"title={self.title}, " + \
            f"body={self.body}, " + \
            f"user_id={self.user_id})"