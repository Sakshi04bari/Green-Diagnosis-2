#!/bin/bash
# Script to start the Flask backend with proper setup

echo "🚀 Starting GREEN Diagnosis Backend Setup..."
echo "================================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install Python first."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip first."
    exit 1
fi

echo "✅ Python and pip are available"

# Install dependencies
echo "📦 Installing Python dependencies..."
pip3 install flask flask-cors tensorflow opencv-python numpy pillow

# Check if model file exists
if [ ! -f "banana_Leaf_disease_model.h5" ]; then
    echo "⚠️  WARNING: Model file 'banana_Leaf_disease_model.h5' not found!"
    echo "💡 Please place your trained model file in this directory"
    echo "📁 Current directory: $(pwd)"
fi

# Start the Flask server
echo "🔥 Starting Flask server..."
python3 main.py
