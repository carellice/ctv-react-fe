import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import {LoadingButton} from "@mui/lab";
import LoginIcon from '@mui/icons-material/Login';
import {SNACKBAR_ERROR, SNACKBAR_SUCCESS} from "../utils/SnackBarUtils";
import * as HistoryUtils from "../utils/HistoryUtils";

const LoginPage = ({loginFunc, snackBarFunc, setSelectedPage}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  // Funzione da eseguire quando si preme Invio
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !loading) {
      setLoading(true);
      loginFunc(user, password).then(r => {
        if(r === 'ok'){
          snackBarFunc("Login effettuato con successo", SNACKBAR_SUCCESS);
          localStorage.setItem("user", user);
          setSelectedPage("HomePage");
          HistoryUtils.pushState("ctv");
        }else{
          snackBarFunc(r, SNACKBAR_ERROR);
          setLoading(false);
        }
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{marginTop:80}}>
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
          onKeyPress={handleKeyPress}
          onChange={handlePasswordChange}
        />
        {/*<Button variant="contained" color="primary" onClick={() => loginFunc(user, password)} style={{ marginTop: 20 }}>*/}
        {/*  Login*/}
        {/*</Button>*/}
        <LoadingButton
            style={{ marginTop: 20 }}
            loading={loading}
            onClick={() => {
              setLoading(true);
              loginFunc(user, password).then(r => {
                if(r === 'ok'){
                  snackBarFunc("Login effettuato con successo", SNACKBAR_SUCCESS);
                  localStorage.setItem("user", user);
                  setSelectedPage("HomePage");
                  HistoryUtils.pushState("ctv");
                }else{
                  snackBarFunc(r, SNACKBAR_ERROR);
                  setLoading(false);
                }
              });
            }}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            variant="contained"
        >
          Login
        </LoadingButton>
      </Paper>
    </Container>
  );
};

export default LoginPage;
