import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/getAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON data
        setUsers(data); // Update users state
        setLoading(false); // Update loading state
      } catch (err) {
        setError(err.message);
        setLoading(false); // Stop loading on error
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <Typography variant="body1">Loading...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" style={{ marginTop: '20px' }}>
        {error}
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="div" style={{ padding: '16px' }}>
        Employees
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Employees;
