// src/pages/OrdersListPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, CardActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para navegação entre páginas

function OrdersListPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Usado para navegação entre páginas

  // Carregar todos os pedidos do usuário
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtém o token do localStorage
        if (!token) {
          setError('Token de autenticação não encontrado');
          return;
        }
        
        // Faz a requisição GET para buscar todos os pedidos
        const response = await axios.get('http://localhost:3000/api/v1/pedidos/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        });

        setOrders(response.data); // Atualiza o estado com os pedidos recebidos
      } catch (err) {
        setError('Erro ao buscar pedidos. Tente novamente.');
        console.error(err);
      }
    };

    fetchOrders(); // Chama a função para buscar os pedidos
  }, []);

  // Função para redirecionar para a página de detalhes do pedido
  const handleGoToOrderDetails = (orderId) => {
    navigate(`/pedido/${orderId}`); // Redireciona para a página de detalhes do pedido
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Meus Pedidos
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {orders.length === 0 ? (
          <Typography variant="h6">Você ainda não fez nenhum pedido.</Typography>
        ) : (
          orders.map((order) => (
            <Grid item key={order.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Pedido #{order.id}</Typography>
                  <Typography variant="body2">Data do pedido: {new Date(order.dateOrdered).toLocaleString()}</Typography>
                  <Typography variant="body2">Status: {order.status}</Typography>
                  <Typography variant="body2">Total: R$ {order.totalPrice}</Typography>
                  <Typography variant="body2">Endereço: {decodeURIComponent(order.adress)}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleGoToOrderDetails(order.id)}>
                    Ver Detalhes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default OrdersListPage;
