import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';

const LoginPage = ({loginFunc}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleLogin = () => {
  //   // Aggiungi qui la logica di autenticazione
  //   console.log('User:', user);
  //   console.log('Password:', password);
  // };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:30}}>
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Accedi
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={user}
          onChange={handleUserChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" color="primary" onClick={() => loginFunc(user, password)} style={{ marginTop: 20 }}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
