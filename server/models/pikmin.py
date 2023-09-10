from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Article(db.Model, SerializerMixin):
    __tablename__ = "pikmins"

    id = db.Column(db.Integer, primary_key=True)

    resistance = db.Column(db.String, nullable=False)
    attack = db.Column(db.Integer, nullable=False)
    speed = db.Column(db.String, nullable=False)
    throw = db.Column(db.String, nullable=False)
    carry = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"Article(id={self.id}, " + \
            f"resistance={self.resistance}, " + \
            f"attack={self.attack}, " + \
            f"speed={self.speed}, " + \
            f"throw={self.throw}, " + \
            f"carry={self.carry}, " + \
            f"description={self.description})"