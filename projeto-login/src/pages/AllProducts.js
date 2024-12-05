// src/pages/AllProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, Container, Badge, Box } from '@mui/material'; // Adicionei o Box aqui
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Para navegação entre páginas


function AllProducts() {
  const [products, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]); // Estado para gerenciar o carrinho
  const navigate = useNavigate(); // Usado para navegação entre páginas

  // Carregar os itens do carrinho do localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Salvar o carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // A cada alteração no carrinho, salva no localStorage

  useEffect(() => {
    // Carregar os produtos da API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/produtos/');
        setAllProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Função para redirecionar para a página do carrinho
  const goToCart = () => {
    navigate('/pedidos'); // Redireciona para a página de pedidos
  };

  // Função para redirecionar para a página de pedidos
  const goToOrders = () => {
    navigate('/pedidos'); // Redireciona para a página de pedidos
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: '#D2B48C',
          minHeight: '100vh',
          padding: '20px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom>
            Produtos Disponíveis
            <Badge
              badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)}
              color="secondary"
              style={{ marginLeft: '20px', cursor: 'pointer' }}
            >
              <ShoppingCartIcon onClick={goToCart} />
            </Badge>
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
                    <Button size="small" color="primary" onClick={() => addToCart(product)}>
                      Adicionar ao Carrinho
                    </Button>
                    <Button size="small" color="secondary">
                      Ver Detalhes
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Botão para redirecionar para a página de pedidos */}
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={goToOrders}>
              Ver Meus Pedidos
            </Button>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default AllProducts;
