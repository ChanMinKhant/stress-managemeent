from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load("stress_level_rf_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Ensure proper shape: expecting 20 input features
    features = [
        'anxiety_level', 'self_esteem', 'mental_health_history', 'depression',
        'headache', 'blood_pressure', 'sleep_quality', 'breathing_problem',
        'noise_level', 'living_conditions', 'safety', 'basic_needs',
        'academic_performance', 'study_load', 'teacher_student_relationship',
        'future_career_concerns', 'social_support', 'peer_pressure',
        'extracurricular_activities', 'bullying'
    ]

    try:
        input_data = [data[feature] for feature in features]
        input_array = np.array(input_data).reshape(1, -1)
        prediction = model.predict(input_array)[0]
        return jsonify({'stress_level': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
