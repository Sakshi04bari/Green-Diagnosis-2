"""
Quick Flask server starter with minimal dependencies.
Use this if you're having trouble with the main backend.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'GREEN Diagnosis Backend is running (Quick Start Mode)',
        'model_loaded': False,
        'mode': 'testing'
    })

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return '', 200
    
    print("📥 Received prediction request")
    
    if 'image' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    # Mock response for testing
    mock_response = {
        "disease": "Healthy",
        "confidence": "95.50%",
        "causes": "This is a test response - your Flask server is working!",
        "prevention": "Replace this with your actual model for real predictions."
    }
    
    print(f"🔍 Mock prediction for: {file.filename}")
    return jsonify(mock_response)

if __name__ == '__main__':
    print("🚀 Starting Quick Flask Server (Testing Mode)...")
    print("📍 Server URL: http://localhost:5000")
    print("⚠️  This is a TEST server - no actual AI predictions")
    print("💡 Use this to test frontend-backend connection")
    print("🔥 Ready to accept requests!")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
