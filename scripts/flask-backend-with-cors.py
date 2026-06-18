"""
Updated Flask backend with CORS support for the plant disease detection app.
Save this as main.py and run it to start the backend server.
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import cv2
import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

app = Flask(__name__, template_folder='./templates', static_folder='./static')

# Enable CORS for all routes
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

# Load the trained CNN model
model_path = 'banana_Leaf_disease_model.h5'

try:
    model = load_model(model_path)
    print(f"✅ Model loaded successfully from {model_path}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Disease categories
category_index = {
    0: 'Healthy',
    1: 'Sigatoka',
    2: 'Xanthomonas'
}

# Preprocess the input image
def format_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224), color_mode="grayscale")
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    return img_array

# Predict the disease from the image
def predict_disease(image_path):
    if model is None:
        raise Exception("Model not loaded")
    
    img_array = format_image(image_path)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])
    confidence = predictions[0][predicted_class]
    disease_name = category_index[predicted_class]
    return disease_name, confidence

# Health check route
@app.route('/')
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'GREEN Diagnosis Backend is running',
        'model_loaded': model is not None
    })

# Home route (for backward compatibility)
@app.route('/home')
def home():
    return render_template('index1.html')

# Prediction route
@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 200
    
    print("📥 Received prediction request")
    
    if 'image' not in request.files:
        print("❌ No file uploaded")
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        print("❌ No file selected")
        return jsonify({'error': 'No file selected'}), 400
    
    # Check if the file is an image
    if not file.filename.lower().endswith(('jpg', 'jpeg', 'png', 'bmp', 'gif')):
        print("❌ Invalid file type")
        return jsonify({'error': 'Uploaded file is not an image'}), 400

    if model is None:
        print("❌ Model not loaded")
        return jsonify({'error': 'Model not loaded. Please check server logs.'}), 500

    # Save the uploaded image
    upload_folder = './uploaded_images'
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)
    print(f"💾 Image saved to {file_path}")

    # Predict disease
    try:
        disease, confidence = predict_disease(file_path)
        print(f"🔍 Prediction: {disease} ({confidence*100:.2f}%)")

        # Response based on disease
        response = {
            "disease": disease,
            "confidence": f"{confidence * 100:.2f}%",
            "causes": "",
            "prevention": ""
        }

        if disease == "Sigatoka":
            response["causes"] = "High humidity, poor plant hygiene, root rotting"
            response["prevention"] = "Proper water drainage, fungicide treatment"
        elif disease == "Xanthomonas":
            response["causes"] = "Lack of nutrients, warm weather"
            response["prevention"] = "Fertilizers rich in nutrients, remove or burn infected leaves"
        else:
            print('✅ Plant is Healthy')

        # Clean up uploaded file
        try:
            os.remove(file_path)
            print(f"🗑️ Cleaned up {file_path}")
        except:
            pass

        return jsonify(response)

    except Exception as e:
        print(f"❌ Error predicting disease: {str(e)}")
        return jsonify({'error': f"Error predicting disease: {str(e)}"}), 500

if __name__ == '__main__':
    print("🚀 Starting GREEN Diagnosis Backend...")
    print("📍 Server will run on http://localhost:5000")
    print("🔗 Frontend should connect to http://localhost:5000/predict")
    print("💡 Make sure your model file 'banana_Leaf_disease_model.h5' is in the same directory")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
