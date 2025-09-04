import requests
import sys
from datetime import datetime
import json

class BackendAPITester:
    def __init__(self, base_url="https://assetmaster-6.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}" if endpoint else f"{self.base_url}/api/"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"Response text: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API Endpoint", "GET", "", 200)

    def test_get_status_checks(self):
        """Test getting status checks"""
        return self.run_test("Get Status Checks", "GET", "status", 200)

    def test_create_status_check(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test("Create Status Check", "POST", "status", 200, test_data)

def main():
    print("🚀 Starting Backend API Tests for Fixed Asset Management Dashboard")
    print("=" * 60)
    
    # Setup
    tester = BackendAPITester()

    # Run tests
    print("\n📋 Testing Basic API Endpoints...")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test GET status checks
    tester.test_get_status_checks()
    
    # Test POST status check
    tester.test_create_status_check()
    
    # Test GET status checks again to see if data persisted
    print("\n🔄 Testing data persistence...")
    tester.test_get_status_checks()

    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Backend API Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("✅ All backend API tests passed!")
        return 0
    else:
        print("❌ Some backend API tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())