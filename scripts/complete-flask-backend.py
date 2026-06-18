"""
Complete Flask backend with enhanced error handling and logging.
This is your main.py file - copy this to your backend directory.
"""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import cv2
import os
import numpy as np
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, template_folder='./templates', static_folder='./static')

# Enable CORS for all routes - allow requests from Next.js frontend
CORS(app, origins=[
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://localhost:3001",  # Alternative port
    "https://your-frontend-domain.vercel.app"  # Add your production domain
])

# Try to import TensorFlow and load model
model = None
try:
    from tensorflow.keras.models import load_model
    from tensorflow.keras.preprocessing import image
    
    model_path = 'banana_Leaf_disease_model.h5'
    if os.path.exists(model_path):
        model = load_model(model_path)
        logger.info(f"✅ Model loaded successfully from {model_path}")
    else:
        logger.error(f"❌ Model file not found: {model_path}")
        logger.info("💡 Make sure 'banana_Leaf_disease_model.h5' is in the same directory as this script")
        
except ImportError as e:
    logger.error(f"❌ TensorFlow import error: {e}")
    logger.info("💡 Install TensorFlow: pip install tensorflow")
except Exception as e:
    logger.error(f"❌ Error loading model: {e}")

# Disease categories
category_index = {
    0: 'Healthy',
    1: 'Sigatoka', 
    2: 'Xanthomonas'
}

def format_image(img_path):
    """Preprocess the input image for model prediction"""
    try:
        img = image.load_img(img_path, target_size=(224, 224), color_mode="grayscale")
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0
        return img_array
    except Exception as e:
        logger.error(f"Error processing image {img_path}: {e}")
        raise

def predict_disease(image_path):
    """Predict disease from image"""
    if model is None:
        raise Exception("Model not loaded")
    
    img_array = format_image(image_path)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])
    confidence = predictions[0][predicted_class]
    disease_name = category_index[predicted_class]
    return disease_name, confidence

@app.route('/')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'GREEN Diagnosis Backend is running',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': model is not None,
        'version': '1.0.0'
    })

@app.route('/status')
def detailed_status():
    """Detailed status endpoint for debugging"""
    try:
        import tensorflow as tf
        tf_version = tf.__version__
    except:
        tf_version = "Not installed"
    
    try:
        import cv2
        cv_version = cv2.__version__
    except:
        cv_version = "Not installed"
    
    return jsonify({
        'backend_status': 'running',
        'model_loaded': model is not None,
        'model_path': 'banana_Leaf_disease_model.h5',
        'model_exists': os.path.exists('banana_Leaf_disease_model.h5'),
        'tensorflow_version': tf_version,
        'opencv_version': cv_version,
        'upload_folder': './uploaded_images',
        'categories': category_index
    })

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    """Main prediction endpoint"""
    # Handle preflight OPTIONS request for CORS
    if request.method == 'OPTIONS':
        return '', 200
    
    logger.info("📥 Received prediction request")
    
    # Validate request
    if 'image' not in request.files:
        logger.warning("❌ No file uploaded")
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        logger.warning("❌ No file selected")
        return jsonify({'error': 'No file selected'}), 400
    
    # Validate file type
    allowed_extensions = {'jpg', 'jpeg', 'png', 'bmp', 'gif'}
    file_extension = file.filename.lower().split('.')[-1]
    if file_extension not in allowed_extensions:
        logger.warning(f"❌ Invalid file type: {file_extension}")
        return jsonify({'error': f'Invalid file type. Allowed: {", ".join(allowed_extensions)}'}), 400

    # Check if model is loaded
    if model is None:
        logger.error("❌ Model not loaded")
        return jsonify({
            'error': 'Model not loaded. Please check server logs.',
            'details': 'Make sure banana_Leaf_disease_model.h5 is in the server directory'
        }), 500

    # Create upload directory
    upload_folder = './uploaded_images'
    os.makedirs(upload_folder, exist_ok=True)
    
    # Save uploaded file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(upload_folder, safe_filename)
    
    try:
        file.save(file_path)
        logger.info(f"💾 Image saved to {file_path}")
        
        # Predict disease
        disease, confidence = predict_disease(file_path)
        logger.info(f"🔍 Prediction: {disease} ({confidence*100:.2f}%)")

        # Prepare response based on disease
        response = {
            "disease": disease,
            "confidence": f"{confidence * 100:.2f}%",
            "causes": "",
            "prevention": "",
            "timestamp": datetime.now().isoformat()
        }

        # Add disease-specific information
        if disease == "Sigatoka":
            response["causes"] = "High humidity, poor plant hygiene, dense planting, inadequate drainage"
            response["prevention"] = "Improve drainage, increase plant spacing, apply fungicide treatments, remove infected leaves"
        elif disease == "Xanthomonas":
            response["causes"] = "Bacterial infection, warm humid weather, plant wounds, contaminated tools"
            response["prevention"] = "Use disease-free seeds, sanitize tools, apply copper-based bactericides, improve nutrition"
        else:
            response["causes"] = "Plant appears healthy"
            response["prevention"] = "Continue good plant care practices, regular monitoring"

        return jsonify(response)

    except Exception as e:
        logger.error(f"❌ Error during prediction: {str(e)}")
        return jsonify({
            'error': f"Prediction failed: {str(e)}",
            'details': 'Check server logs for more information'
        }), 500
    
    finally:
        # Clean up uploaded file
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"🗑️ Cleaned up {file_path}")
        except Exception as e:
            logger.warning(f"Failed to clean up file: {e}")

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting GREEN Diagnosis Backend...")
    print("=" * 50)
    print(f"📍 Server URL: http://localhost:5000")
    print(f"🔗 Health Check: http://localhost:5000/")
    print(f"📊 Status: http://localhost:5000/status")
    print(f"🎯 Prediction: http://localhost:5000/predict")
    print("=" * 50)
    
    if model is None:
        print("⚠️  WARNING: Model not loaded!")
        print("💡 Make sure 'banana_Leaf_disease_model.h5' is in this directory")
    else:
        print("✅ Model loaded successfully")
    
    print("🔥 Ready to accept requests!")
    print("Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Run the Flask app
    app.run(
        debug=True, 
        host='0.0.0.0', 
        port=5000,
        threaded=True
    )
