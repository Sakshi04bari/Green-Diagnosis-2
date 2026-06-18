from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import cv2
import os
import numpy as np
import logging
from datetime import datetime
import json
import gdown
from flask_cors import CORS
from PIL import Image
from tensorflow.keras.models import load_model





MODEL_PATH = "banana_Leaf_disease_model.h5"

if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    url = "https://drive.google.com/uc?id=1EBRk7RIuNxLGzUi54JMS1c5_-YshYvEu"
    gdown.download(url, MODEL_PATH, quiet=False)
# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


model = load_model(MODEL_PATH)
# Initialize Flask app
app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

CORS(app)

# Enable CORS for all routes
CORS(app, origins=[
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
])

# Global variables
model = None
model_loaded = False

try:
    if not os.path.exists(MODEL_PATH):
        print("Downloading model from Google Drive...")
        gdown.download(
            id="1EBRk7RIuNxLGzUi54JMS1c5_-YshYvEu",
            output=MODEL_PATH,
            quiet=False
        )

    model = load_model(MODEL_PATH)
    model_loaded = True

    logger.info("✅ Model loaded successfully")

except Exception as e:
    logger.error(f"❌ Error loading model: {e}")

# Disease categories
DISEASE_CATEGORIES = {
    0: 'Healthy',
    1: 'Sigatoka', 
    2: 'Xanthomonas'
}

# Allowed upload extensions
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'bmp', 'gif'}

# Disease information
DISEASE_INFO = {
    'Sigatoka': {
        'causes': 'High humidity, poor plant hygiene, dense planting, inadequate drainage, fungal spores spread by wind and rain',
        'prevention': 'Improve drainage systems, increase plant spacing, apply fungicide treatments, remove infected leaves immediately, maintain proper plant nutrition'
    },
    'Xanthomonas': {
        'causes': 'Bacterial infection, warm humid weather, plant wounds, contaminated tools, infected seeds or planting materials',
        'prevention': 'Use disease-free seeds, sanitize tools between plants, apply copper-based bactericides, improve plant nutrition, avoid working with wet plants'
    },
    'Healthy': {
        'causes': 'Plant appears healthy with no visible disease symptoms',
        'prevention': 'Continue good plant care practices, regular monitoring, proper watering, adequate nutrition, preventive treatments'
    }
}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def validate_image_file(file_path):
    try:
        with Image.open(file_path) as img:
            img.verify()
        return True
    except Exception as e:
        logger.error(f"Invalid image file {file_path}: {e}")
        return False


def preprocess_image(img_path):
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
    if not model_loaded or model is None:
        raise Exception("Model not loaded")
    
    img_array = preprocess_image(image_path)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_class])
    disease_name = DISEASE_CATEGORIES[predicted_class]
    
    return disease_name, confidence


@app.route('/')
def index():
    """Serve the main HTML page"""
    return render_template('index.html')

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'GREEN Diagnosis Backend is running',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': model_loaded,
        'version': '2.0.0'
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
        'model_loaded': model_loaded,
        'model_path': 'banana_Leaf_disease_model.h5',
        'model_exists': os.path.exists('banana_Leaf_disease_model.h5'),
        'tensorflow_version': tf_version,
        'opencv_version': cv_version,
        'upload_folder': './uploaded_images',
        'categories': DISEASE_CATEGORIES,
        'supported_formats': ['jpg', 'jpeg', 'png', 'bmp', 'gif']
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
    file_extension = file.filename.lower().split('.')[-1] if '.' in file.filename else ''
    if not allowed_file(file.filename):
        logger.warning(f"❌ Invalid file type: {file_extension}")
        return jsonify({
            'error': 'Upload a banana leaf image.'
        }), 400

    # Check if model is loaded
    if not model_loaded or model is None:
        logger.error("❌ Model not loaded")
        return jsonify({
            'error': 'Model not loaded. Please check server logs.',
            'details': 'Make sure banana_Leaf_disease_model.h5 is in the server directory'
        }), 500

    # Create upload directory
    upload_folder = './uploaded_images'
    os.makedirs(upload_folder, exist_ok=True)
    
    # Save uploaded file with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(upload_folder, safe_filename)
    
    try:
        file.save(file_path)
        logger.info(f"💾 Image saved to {file_path}")

        if not validate_image_file(file_path):
            logger.error(f"❌ Uploaded file is not a valid image: {file_path}")
            return jsonify({
                'error': 'Upload a banana leaf image.'
            }), 400
        
        # Predict disease
        disease, confidence = predict_disease(file_path)
        logger.info(f"🔍 Prediction: {disease} ({confidence*100:.2f}%)")

        # Get disease information
        disease_info = DISEASE_INFO.get(disease, {})
        
        # Prepare response
        response = {
            "disease": disease,
            "confidence": f"{confidence * 100:.2f}%",
            "causes": disease_info.get('causes', ''),
            "prevention": disease_info.get('prevention', ''),
            "timestamp": datetime.now().isoformat(),
            "filename": file.filename
        }

        logger.info(f"✅ Prediction successful for {file.filename}")
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

@app.route('/api/diseases')
def get_diseases():
    """Get information about all diseases"""
    return jsonify({
        'categories': DISEASE_CATEGORIES,
        'disease_info': DISEASE_INFO
    })

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('static', filename)

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f"Internal server error: {error}")
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(413)
def file_too_large(error):
    """Handle file too large errors"""
    return jsonify({'error': 'File too large. Maximum size is 16MB'}), 413

if __name__ == '__main__':
    print("🚀 Starting GREEN Diagnosis Backend...")
    print("=" * 60)
    print(f"📍 Server URL: http://localhost:5000")
    print(f"🔗 Health Check: http://localhost:5000/health")
    print(f"📊 Status: http://localhost:5000/status")
    print(f"🎯 Prediction: http://localhost:5000/predict")
    print(f"🌐 Web Interface: http://localhost:5000")
    print("=" * 60)
    
    if not model_loaded:
        print("⚠️  WARNING: Model not loaded!")
        print("💡 Make sure 'banana_Leaf_disease_model.h5' is in this directory")
        print("🔄 The web interface will still work for testing UI")
    else:
        print("✅ Model loaded successfully")
    
    print("🔥 Ready to accept requests!")
    print("📱 Open http://localhost:5000 in your browser")
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    
    # Configure Flask app settings
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
    
    # Run the Flask app
    port = int(os.environ.get("PORT", 5000))

app.run(
    host="0.0.0.0",
    port=port,
    debug=False
)