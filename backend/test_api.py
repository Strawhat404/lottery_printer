import requests
import json

def test_registration():
    url = "http://localhost:8000/api/register/"
    
    # Test Case 1: Valid Registration
    data = {
        "email": "test@example.com",
        "phone_number": "1234567890",
        "username": "testuser"
    }
    
    print("Testing valid registration...")
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print("-" * 50)
    
    # Test Case 2: Duplicate Email
    print("Testing duplicate email...")
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print("-" * 50)
    
    # Test Case 3: Invalid Email
    data["email"] = "invalid-email"
    print("Testing invalid email...")
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    test_registration()