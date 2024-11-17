// src/components/LoginForm.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Usar a função login do contexto
  const navigate = useNavigate(); // Cria o hook de navegação

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/usuarios/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBkMjk3OGViNjFkM2ZiMWYzMjMzMjUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzE1MzQ4NzYsImV4cCI6MTczMTYyMTI3Nn0.twG0UQUxPJqgPXk2tQXLrz69Oyv6Ex9DIEMI-OSWU4A',
        }
      });

      // Chamar a função login do contexto com o token
      login(response.data.token);
      alert("Login realizado com sucesso!");
      
      // Redireciona para a página inicial
      navigate('/produtos/get/featured/:count');
      
    } catch (err) {
      setError("Erro no login. Verifique suas credenciais.");
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      sx={{ backgroundColor: 'white', minHeight: 'max-content', justifyContent: 'center' }} // Adiciona a cor de fundo
    >
      <img 
        src="imagens/image.png" // Substitua pelo caminho correto do seu logo
        alt="Logo" 
        style={{ width: 150, marginBottom: 20 }} // Centraliza e define o tamanho do logo
      />
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: 16 }}>
        Login
      </Button>
    </Box>
  );
}

export default LoginForm;
