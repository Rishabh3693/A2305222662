import requests

url = "http://20.244.56.144/evaluation-service/register"

data = {
    "email": "messtinoronil@gmail.com",
    "name": "Rishabh",
    "mobileNo": "9899850754",
    "githubUsername": "Rishabh3693",
    "rollNo": "A2305222662",
    "accessCode": "FzRGjY"
}

response = requests.post(url, json=data)

if response.status_code == 200:
    print("Registration successful!")
    print("Response:", response.json())
else:
    print("Registration failed.")
    print("Status code:", response.status_code)
    print("Response:", response.text)