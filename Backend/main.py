from fastapi import FastAPI
from fetcher import fetch_cpi_u, fetch_tbill
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

# Allow frontend (React) to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/cpi")
def get_cpi():
    return fetch_cpi_u()

@app.get("/api/tbill")
def get_tbill():
    return fetch_tbill()

@app.get("/api/cpi/historical")
def get_cpi_historical(start_date: str, end_date: str):
    historical_data = [
        {"date": "2025-01-01", "value": 300.50},
        {"date": "2025-02-01", "value": 305.12},
        {"date": "2025-03-01", "value": 307.45},
        {"date": "2025-04-01", "value": 310.20},
        {"date": "2025-05-01", "value": 307.78},
    ]
    
    # Convert string dates to datetime objects
    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")

    # Filter historical data based on the date range
    filtered_data = [
        data for data in historical_data
        if start_date <= datetime.strptime(data["date"], "%Y-%m-%d") <= end_date
    ]
    
    return filtered_data

@app.get("/api/tbill/historical")
def get_tbill_historical(start_date: str, end_date: str):
    historical_data = [
        {"date": "2025-01-01", "rate": 4.85},
        {"date": "2025-02-01", "rate": 4.90},
        {"date": "2025-03-01", "rate": 5.00},
        {"date": "2025-04-01", "rate": 5.10},
        {"date": "2025-05-01", "rate": 5.13},
    ]
    
    # Convert string dates to datetime objects
    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")

    # Filter historical data based on the date range
    filtered_data = [
        data for data in historical_data
        if start_date <= datetime.strptime(data["date"], "%Y-%m-%d") <= end_date
    ]
    
    return filtered_data
