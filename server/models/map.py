from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Map(db.Model, SerializerMixin):
    __tablename__ = "maps"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"Map(id={self.id}, " + \
            f"name={self.name}, " + \
            f"description={self.description})"