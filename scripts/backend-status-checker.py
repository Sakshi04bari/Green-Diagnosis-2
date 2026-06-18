"""
Simple script to check if your Flask backend is running and accessible.
Run this to diagnose connection issues.
"""

import requests
import json
from datetime import datetime

def check_backend_status():
    print("🔍 Checking Flask Backend Status...")
    print("=" * 50)
    
    # URLs to test
    test_urls = [
        "http://localhost:5000/",
        "http://127.0.0.1:5000/",
        "http://localhost:5000/status"
    ]
    
    for url in test_urls:
        print(f"\n📡 Testing: {url}")
        try:
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                print(f"✅ SUCCESS - Status: {response.status_code}")
                try:
                    data = response.json()
                    print(f"📄 Response: {json.dumps(data, indent=2)}")
                except:
                    print(f"📄 Response: {response.text[:200]}...")
            else:
                print(f"⚠️  WARNING - Status: {response.status_code}")
                print(f"📄 Response: {response.text[:200]}...")
                
        except requests.exceptions.ConnectionError:
            print("❌ CONNECTION FAILED - Server not running or not accessible")
        except requests.exceptions.Timeout:
            print("⏰ TIMEOUT - Server took too long to respond")
        except Exception as e:
            print(f"❌ ERROR - {str(e)}")
    
    print("\n" + "=" * 50)
    print("💡 TROUBLESHOOTING TIPS:")
    print("1. Make sure Flask server is running: python main.py")
    print("2. Check if port 5000 is available")
    print("3. Verify your model file exists: banana_Leaf_disease_model.h5")
    print("4. Check Flask console for error messages")
    print("5. Try restarting the Flask server")

if __name__ == "__main__":
    try:
        check_backend_status()
    except KeyboardInterrupt:
        print("\n👋 Status check cancelled by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
