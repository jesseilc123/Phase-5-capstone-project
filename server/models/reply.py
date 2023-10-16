from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Reply(db.Model, SerializerMixin):
    __tablename__ = 'replies'

    serialize_rules = ('-user', '-post')

    id = db.Column(db.Integer, primary_key=True)

    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

    @validates("content")
    def check_content(self, key, content):
        if (not content):
            raise ValueError({"message": "Content must exist"})
        return content

    def __repr__(self):
        return f"Reply(id={self.id}, " + \
            f"content={self.content}, " + \
            f"user_id={self.user_id}, " + \
            f"post_id={self.post_id})"