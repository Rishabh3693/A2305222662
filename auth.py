import requests

url = "http://20.244.56.144/evaluation-service/auth"

data = {
    "email": "messtinoronil@gmail.com",
    "rollNo": "A2305222662",
    "name": "Rishabh",
    "accessCode": "FzRGjY",
    'clientID': 'a97a51b9-5d46-411a-b590-c3ffd7ee9e4c',
    'clientSecret': 'MgBjVhaEsPEYPvqw'
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print("Registration successful!")
    print("Response:", response.json())
else:
    print("Registration failed.")
    print("Status code:", response.status_code)
    print("Response:", response.text)