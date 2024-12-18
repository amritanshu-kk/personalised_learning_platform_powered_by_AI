from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from pypdf import PdfReader
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Gemini API
os.environ["GOOGLE_API_KEY"] = "AIzaSyD5tw09-u_RaQpk5Sp69lZeUQ95gDWjtCI"
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function: Extract Text from PDF
def extract_pdf_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        return "Error reading PDF: {}".format(str(e))

# Function: Generate Quiz Using Gemini AI
def generate_quiz_from_content(course_content):
    prompt = f"Create a set of 5 multiple-choice quiz questions with answers based on the following course content:\n\n{course_content}. Return the answer as a well-structured JSON in the following format: {{'questions': [{{'question': 'some question', 'options': ['first option', 'second option', ...], 'correctAnswer': 'second option'}}]}}"
    
    # Generate quiz using Gemini AI
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json"),
    )
    
    print(response.text)
    # Initialize the quiz structure
    quiz = {
        "course_name": "introduction_to_AI",  # This can be set dynamically based on course_name input
        "questions": []
    }
    
    # Assuming the AI returns structured text in a specific format:
    # lines = response.text.split("\n")
    data = json.loads(response.text)
    
    # question = None
    # options = []
    # correct_answer = None
    
    # for line in lines:
    #     line = line.strip()
        
    #     if line.startswith("Q:"):
    #         # If we were collecting a previous question, add it to the quiz
    #         if question:
    #             quiz["questions"].append({
    #                 "question": question,
    #                 "options": options,
    #                 "correctAnswer": correct_answer
    #             })
            
    #         # Start a new question
    #         question = line[2:].strip()
    #         options = []
    #         correct_answer = None
        
    #     elif line.startswith("A:"):
    #         # Add an option
    #         options.append(line[2:].strip())
        
    #     elif line.startswith("Correct Answer:"):
    #         # Set the correct answer
    #         correct_answer = line[15:].strip()  # This assumes the correct answer is part of the text
        
    # Add the last question
    # if question:
    #     quiz["questions"].append({
    #         "question": question,
    #         "options": options,
    #         "correctAnswer": correct_answer
    #     })
    
    # Return the quiz as a JSON object (Flask will handle the conversion automatically)
    return data

# Endpoint: Get Quiz for a Selected Course
@app.route('/api/get_course_quiz', methods=['POST'])
def get_course_quiz():
    try:
        # Simulated course data (map course names to PDF files stored on the server)
        course_files = {
            "introduction_to_AI": "courses/introduction_to_AI.pdf",
            "machine_learning_basics": "courses/machine_learning_basics.pdf",
        }

        # Get selected course from the request
        data = request.json
        course_name = data.get("course_name")

        if course_name not in course_files:
            return jsonify({"error": "Course not found"}), 404

        # Extract course content
        pdf_path = course_files[course_name]
        course_content = extract_pdf_text(pdf_path)

        # Generate quiz using Gemini AI
        quiz = generate_quiz_from_content(course_content)

        # Return the quiz JSON response
        return jsonify(quiz)

    except Exception as e:
        print(f"Error in /api/get_course_quiz: {str(e)}")  # Log the error
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

# Endpoint: Recommend Sections or Levels Based on Quiz Results
@app.route('/api/recommend_sections', methods=['POST'])
def recommend_sections():
    try:
        # Mock logic: Calculate user level based on correct answers
        data = request.json
        correct_answers = data.get("correct_answers", 0)

        if correct_answers >= 4:
            level = "Advanced"
            recommendations = ["Explore Advanced Topics", "Practice Mock Exams"]
        elif correct_answers >= 2:
            level = "Intermediate"
            recommendations = ["Review Core Concepts", "Try Intermediate Exercises"]
        else:
            level = "Beginner"
            recommendations = ["Start with Basics", "Watch Introductory Videos"]

        return jsonify({
            "user_level": level,
            "recommendations": recommendations
        })

    except Exception as e:
        print(f"Error in /api/recommend_sections: {str(e)}")  # Log the error
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
