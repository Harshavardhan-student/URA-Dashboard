import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CPI from "./Components/CPI";
import TBill from "./Components/TBill";

function App() {
  const [cpiData, setCpiData] = useState([]);
  const [tbillData, setTbillData] = useState([]);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-05-14");

  // Fetch historical data based on date range
  useEffect(() => {
    fetch(`http://localhost:8000/api/cpi/historical?start_date=${startDate}&end_date=${endDate}`)
      .then((res) => res.json())
      .then((data) => setCpiData(data));

    fetch(`http://localhost:8000/api/tbill/historical?start_date=${startDate}&end_date=${endDate}`)
      .then((res) => res.json())
      .then((data) => setTbillData(data));
  }, [startDate, endDate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>URA Dashboard</h1>
      <CPI />
      <TBill />
      <div>
        <h2>Filter Data by Date Range</h2>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <h2>CPI-U and T-Bill Historical Data</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={cpiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer>
          <LineChart data={tbillData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
