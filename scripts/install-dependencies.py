"""
Installation script for all required Python packages for the plant disease detection backend.
Run this script to install all dependencies at once.
"""

import subprocess
import sys

def install_package(package):
    """Install a package using pip"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"✅ Successfully installed {package}")
        return True
    except subprocess.CalledProcessError:
        print(f"❌ Failed to install {package}")
        return False

def main():
    print("🚀 Installing Python dependencies for GREEN Diagnosis Backend...")
    print("=" * 60)
    
    # List of required packages
    packages = [
        "flask",
        "flask-cors", 
        "tensorflow",
        "opencv-python",
        "numpy",
        "pillow"
    ]
    
    successful_installs = 0
    failed_installs = []
    
    for package in packages:
        print(f"\n📦 Installing {package}...")
        if install_package(package):
            successful_installs += 1
        else:
            failed_installs.append(package)
    
    print("\n" + "=" * 60)
    print("📊 INSTALLATION SUMMARY:")
    print(f"✅ Successfully installed: {successful_installs}/{len(packages)} packages")
    
    if failed_installs:
        print(f"❌ Failed to install: {', '.join(failed_installs)}")
        print("\n💡 Try installing failed packages manually:")
        for package in failed_installs:
            print(f"   pip install {package}")
    else:
        print("🎉 All packages installed successfully!")
        print("\n🔥 You're ready to run the Flask backend!")
        print("📝 Next steps:")
        print("   1. Make sure your model file 'banana_Leaf_disease_model.h5' is ready")
        print("   2. Run: python main.py")
        print("   3. Backend will be available at http://localhost:5000")

if __name__ == "__main__":
    main()
