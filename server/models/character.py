from config import db
from sqlalchemy_serializer import SerializerMixin

class Character(db.Model, SerializerMixin):
    __tablename__ = "characters"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String, nullable=False)
    planet = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"Character(id={self.id}, " + \
            f"name={self.name}, " + \
            f"planet={self.planet}, " + \
            f"title={self.title}, " + \
            f"description={self.description})"