import requests
from datetime import datetime

# Mock function: Replace with real BLS and Treasury API logic
def fetch_cpi_u():
    # Replace with real BLS CPI API endpoint + key
    return {
        "date": str(datetime.now().date()),
        "value": 307.789,  # Mock CPI-U value
        "source": "Mock BLS API"
    }

def fetch_tbill():
    # Replace with real Treasury API endpoint
    return {
        "date": str(datetime.now().date()),
        "rate": 5.13,  # Mock T-Bill rate
        "source": "Mock Treasury API"
    }
