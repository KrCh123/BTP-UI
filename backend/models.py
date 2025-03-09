from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Exam(db.Model):
    __tablename__ = 'exams'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=True)
    questions = db.relationship('Question', backref='exam', lazy=True, cascade="all, delete-orphan")

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    exam_id = db.Column(db.Integer, db.ForeignKey('exams.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    text = db.Column(db.Text, nullable=False)
    options = db.Column(db.Text, nullable=True)  # Store options as a comma-separated string
    student_answer = db.Column(db.String(255), nullable=False)
    related_theory = db.Column(db.Text, nullable=True)
    marks = db.Column(db.Integer, nullable=False)
