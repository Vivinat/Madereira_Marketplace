// src/pages/CartPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useState([]); // Estado para armazenar o carrinho
  const navigate = useNavigate();

  useEffect(() => {
    // Lê o carrinho do localStorage sempre que a página for carregada
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []); // O useEffect executa apenas uma vez, quando o componente é montado

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const handleFinalizeOrder = () => {
    alert('Pedido finalizado!');
    navigate('/pedido'); // Redireciona para a página de confirmação
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Carrinho de Compras</Typography>
      <List>
        {cart.length === 0 ? (
          <Typography variant="h6">O seu carrinho está vazio.</Typography>
        ) : (
          cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.name} - ${item.quantity} x R$ ${item.price}`}
                secondary={`Total: R$ ${(item.quantity * item.price).toFixed(2)}`}
              />
            </ListItem>
          ))
        )}
      </List>
      {cart.length > 0 && (
        <>
          <Typography variant="h6">
            Total: R$ {calculateTotal().toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleFinalizeOrder} sx={{ marginTop: 2 }}>
            Finalizar Pedido
          </Button>
        </>
      )}
    </Box>
  );
}

export default CartPage;
