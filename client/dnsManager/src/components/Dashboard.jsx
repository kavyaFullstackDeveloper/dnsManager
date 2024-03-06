import React, { useState } from "react";
import { Container, Typography, CssBaseline, Paper } from "@mui/material";
import DNSForm from "./DNSForm";
import DNSRecordsTable from "./DNSTable";

const Dashboard = () => {
  const [isAdding, setIsAdding] = useState(true);
  const [editId, setEditId] = useState(null);
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          DNS Dashboard
        </Typography>
        <DNSForm
          setEditId={setEditId}
          editId={editId}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
        <DNSRecordsTable
          setEditId={setEditId}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
        />
      </Paper>
    </Container>
  );
};

export default Dashboard;