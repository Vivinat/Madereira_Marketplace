// src/pages/LoginPage.js
import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '../components/loginform';
import './HomePage.css'; // Importa o CSS se necessário para estilos adicionais


function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" justifyContent="center" height="100vh">
        <LoginForm />
      </Box>
    </Container>
  );
}

export default LoginPage;
