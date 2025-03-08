from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Exam, Question

app = Flask(__name__)
CORS(app)

# Configure the SQLAlchemy part of the app instance
app.config['SECRET_KEY'] = 'Crypto'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Root123$#@localhost/btp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the app with the extension
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/exams', methods=['POST'])
def create_exam():
    data = request.get_json()
    title = data.get('title')
    duration = data.get('duration')
    description = data.get('description')
    questions_data = data.get('questions', [])

    # Create an exam instance
    exam = Exam(title=title, duration=duration, description=description)
    db.session.add(exam)
    db.session.commit()

    # Add questions to the exam
    for question_data in questions_data:
        question = Question(
            exam_id=exam.id,
            type=question_data.get('type'),
            text=question_data.get('text'),
            options=",".join(question_data.get('options', [])),
            correct_answer=question_data.get('correct_answer'),
            related_theory=question_data.get('related_theory'),
            marks=question_data.get('marks')
        )
        db.session.add(question)
    db.session.commit()

    return jsonify({"message": "Exam created successfully", "exam_id": exam.id}), 201

@app.route('/exams', methods=['GET'])
def get_exams():
    exams = Exam.query.all()
    exams_data = []
    for exam in exams:
        questions = Question.query.filter_by(exam_id=exam.id).all()
        questions_data = [
            {
                "id": question.id,
                "type": question.type,
                "text": question.text,
                "options": question.options.split(',') if question.options else [],
                "correct_answer": question.correct_answer,
                "related_theory": question.related_theory,
                "marks": question.marks
            } for question in questions
        ]
        exams_data.append({
            "id": exam.id,
            "title": exam.title,
            "duration": exam.duration,
            "description": exam.description,
            "questions": questions_data
        })
    return jsonify(exams_data), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
