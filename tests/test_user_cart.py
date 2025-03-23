import requests

BASE_URL = "https://fakestoreapi.com"

def test_login_user():
    payload = {
        "username": "mor_2314",
        "password": "83r5^_"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=payload)
    assert response.status_code == 200
    assert "token" in response.json()

def test_get_user_cart():
    user_id = 1
    response = requests.get(f"{BASE_URL}/carts/user/{user_id}")
    assert response.status_code == 200
    carts = response.json()
    assert isinstance(carts, list)
    if carts:
        assert "products" in carts[0]
