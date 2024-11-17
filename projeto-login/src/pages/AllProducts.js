// src/pages/HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Container } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import './HomePage.css'; // Importa o CSS se necessário para estilos adicionais
import Navbar from '../components/Navbar';
function AllProducts() {
  const [products, setAllProducts] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/v1/produtos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        alert("Sessão expirada. Faça login novamente.");
        logout();
      }
    };

    fetchProducts();
  }, [logout]);

  return (
    <>
    <Navbar/>
    <div
      style={{
        backgroundColor: '#D2B48C', // Cor de fundo amadeirada
        minHeight: '100vh',
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Produtos Disponíveis
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {product.description || product.richDescription || "Missing description"}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    R$ {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Em estoque: {product.metersInStock} metros
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Ver Detalhes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
    </>
  );
}

export default AllProducts;
