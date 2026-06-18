"""
Script to verify that all required packages are installed correctly.
Run this after installing dependencies to ensure everything is working.
"""

import sys

def check_package(package_name, import_name=None):
    """Check if a package can be imported"""
    if import_name is None:
        import_name = package_name
    
    try:
        __import__(import_name)
        print(f"✅ {package_name}: OK")
        return True
    except ImportError as e:
        print(f"❌ {package_name}: FAILED - {e}")
        return False

def main():
    print("🔍 Checking Python package installations...")
    print("=" * 50)
    
    packages_to_check = [
        ("Flask", "flask"),
        ("Flask-CORS", "flask_cors"),
        ("TensorFlow", "tensorflow"),
        ("OpenCV", "cv2"),
        ("NumPy", "numpy"),
        ("Pillow", "PIL")
    ]
    
    all_good = True
    
    for package_name, import_name in packages_to_check:
        if not check_package(package_name, import_name):
            all_good = False
    
    print("=" * 50)
    
    if all_good:
        print("🎉 All packages are installed and working correctly!")
        print("\n📋 System Information:")
        print(f"   Python version: {sys.version}")
        
        # Try to get TensorFlow version
        try:
            import tensorflow as tf
            print(f"   TensorFlow version: {tf.__version__}")
        except:
            pass
            
        # Try to get OpenCV version
        try:
            import cv2
            print(f"   OpenCV version: {cv2.__version__}")
        except:
            pass
            
        print("\n🚀 Ready to run the Flask backend!")
    else:
        print("❌ Some packages are missing or not working correctly.")
        print("💡 Try running the installation script again or install manually:")
        print("   pip install flask flask-cors tensorflow opencv-python numpy pillow")

if __name__ == "__main__":
    main()
