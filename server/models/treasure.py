from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Treasure(db.Model, SerializerMixin):
    __tablename__ = "treasures"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String, nullable=False)
    location = db.Column(db.Integer, db.ForeignKey("maps.id"), nullable=False)
    series = db.Column(db.String)
    sparklium = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f"Treasure(id={self.id}, " + \
            f"name={self.name}, " + \
            f"location={self.location}, " + \
            f"series={self.series}, " + \
            f"sparklium={self.sparklium}, " + \
            f"description={self.description})"