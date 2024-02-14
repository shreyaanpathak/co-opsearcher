from app import db

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    company = db.Column(db.String(255))
    location = db.Column(db.String(255))
    # Add other fields as needed

