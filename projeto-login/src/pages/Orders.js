// src/components/OrdersPage.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Ícone de carrinho
import { useNavigate } from 'react-router-dom'; // Para navegação entre páginas
import axios from 'axios'; // Importando o axios para realizar a requisição

function OrdersPage() {
  const [orderItems, setOrderItems] = useState([]); // Estado para armazenar os itens do carrinho
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cep, setCep] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navegação

  // Carregar os itens do pedido do localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setOrderItems(storedCart); // Carrega os itens do carrinho armazenados
    updateTotalPrice(storedCart); // Atualiza o total
  }, []);

  // Função para atualizar o preço total
  const updateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Função para alterar a quantidade de um produto no carrinho
  const handleQuantityChange = (productId, newQuantity) => {
    const updatedItems = orderItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setOrderItems(updatedItems);
    updateTotalPrice(updatedItems);
    // Salvar novamente o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  // Função para limpar o carrinho
  const handleClearCart = () => {
    // Limpa o carrinho do localStorage
    localStorage.removeItem('cart');
    // Reseta o estado do carrinho
    setOrderItems([]);
    setTotalPrice(0);
    alert('Carrinho limpo!');
  };

  // Função para sanitizar dados antes de enviar para o backend
  const sanitizeData = (data) => {
    return encodeURIComponent(data); // Codifica caracteres especiais
  };

  // Função para finalizar o pedido
  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        orderItems: orderItems.map(item => ({
          quantity: item.quantity,
          product: item.id,
        })),
        adress: sanitizeData(address),
        city: sanitizeData(city),
        cep: sanitizeData(cep),
        country: sanitizeData(country),
        phone: sanitizeData(phone),
        totalPrice: totalPrice.toString(),
        user: '670d2978eb61d3fb1f323325', // Isso viria do usuário autenticado
      };

      // Recuperar o token do localStorage
      const token = localStorage.getItem('token'); // Recupera o token real do localStorage

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await axios.post('http://localhost:3000/api/v1/pedidos/', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Usando o token real
        },
      });

      // Limpar o carrinho no localStorage e resetar o estado local
      localStorage.removeItem('cart'); // Remove o carrinho do localStorage
      setOrderItems([]); // Resetando o estado do carrinho
      setTotalPrice(0); // Resetando o total

      alert('Pedido realizado com sucesso!');
      navigate('/pedidos'); // Redireciona para a página de confirmação
    } catch (err) {
      setError('Erro ao realizar o pedido. Tente novamente.');
      console.error(err);
    }
  };

  // Função para redirecionar ao carrinho
  const handleGoToCart = () => {
    navigate('/produtos'); // Redireciona para a página do carrinho
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Carrinho de Compras</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
            {orderItems.map(item => (
              <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography>{item.name}</Typography>
                <Box display="flex" alignItems="center">
                  <Button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    -
                  </Button>
                  <Typography sx={{ marginX: 2 }}>{item.quantity}</Typography>
                  <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                </Box>
                <Typography>R${(item.price * item.quantity).toFixed(2)}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Resumo do Pedido</Typography>
            <Typography><strong>Total:</strong> R${totalPrice.toFixed(2)}</Typography>
            <TextField
              label="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="País"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmitOrder} sx={{ marginTop: 2 }}>
              Finalizar Pedido
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClearCart} sx={{ marginTop: 2, marginLeft: 2 }}>
              Limpar Carrinho
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Ícone de carrinho no topo para redirecionar */}
      <Box sx={{ position: 'fixed', top: '20px', right: '20px' }}>
        <Badge
          badgeContent={orderItems.reduce((acc, item) => acc + item.quantity, 0)}
          color="secondary"
        >
          <ShoppingCartIcon
            sx={{ cursor: 'pointer', fontSize: '2rem' }}
            onClick={handleGoToCart}
          />
        </Badge>
      </Box>
    </Box>
  );
}

export default OrdersPage;
