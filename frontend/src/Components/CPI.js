import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";

function CPI() {
  const [cpi, setCPI] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/cpi")
      .then((res) => res.json())
      .then((data) => {
        setCPI(data);
        setLoading(false);
      });
  }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          CPI-U Data
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" component="p" align="center">
              {cpi.date}: {cpi.value} ({cpi.source})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default CPI;
