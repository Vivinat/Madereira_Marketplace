// src/pages/MainPage.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handleFetchProducts = async () => {
    try {
      const token = localStorage.getItem('token'); // Certifique-se de que o usuário está autenticado
      const response = await axios.get('http://localhost:3000/api/v1/produtos/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Produtos:", response.data); // Exibe os produtos no console
      navigate('/produtos'); // Redireciona para a página de produtos
    } catch (error) {
      console.error("Erro ao buscar os produtos:", error);
      alert("Erro ao buscar produtos. Verifique sua autenticação.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Menu Principal
      </Typography>
      <Typography variant="body1" paragraph>
        Bem-vindo ao Menu Principal! Navegue pelos produtos ou explore outras funcionalidades.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleFetchProducts}>
        Ver Todos os Produtos
      </Button>
    </Container>
  );
}

export default MainPage;
