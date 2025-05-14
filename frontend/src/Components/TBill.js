import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";

function TBill() {
  const [tbill, setTBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the T-Bill data
    const fetchData = () => {
      setLoading(true);
      fetch("http://localhost:8000/api/tbill")
        .then((res) => res.json())
        .then((data) => {
          setTBill(data);
          setLoading(false);
        });
    };

    // Fetch data immediately when the component mounts
    fetchData();

    // Set up an interval to fetch data every 60 seconds
    const interval = setInterval(fetchData, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          T-Bill Rate
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" component="p" align="center">
              {tbill.date}: {tbill.rate}% ({tbill.source})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default TBill;
