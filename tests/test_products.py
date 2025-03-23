import requests

BASE_URL = "https://fakestoreapi.com"

def test_get_all_products():
    response = requests.get(f"{BASE_URL}/products")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_single_product():
    response = requests.get(f"{BASE_URL}/products/1")
    assert response.status_code == 200
    assert "title" in response.json()

def test_invalid_product_id():
    response = requests.get(f"{BASE_URL}/products/9999")
    assert response.status_code in [200, 404]
