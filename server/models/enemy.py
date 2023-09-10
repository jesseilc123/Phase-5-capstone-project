from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Enemy(db.Model, SerializerMixin):
    __tablename__ = "enemies"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String, nullable=False)
    location = db.Column(db.Integer, db.ForeignKey("locations.id"), nullable=False)
    weight = db.Column(db.String, nullable=False)
    sparklium = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"Enemy(id={self.id}, " + \
            f"name={self.name}, " + \
            f"location={self.location}, " + \
            f"weight={self.weight}, " + \
            f"sparklium={self.sparklium}, " + \
            f"description={self.description})"