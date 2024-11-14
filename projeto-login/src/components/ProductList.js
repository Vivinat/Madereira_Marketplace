// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Modal } from '@mui/material';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Carregar os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/produtos');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao carregar os produtos', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Produtos</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {products.map((product) => (
          <Box key={product._id} p={2} m={1} border={1} borderRadius={2} width="300px">
            <Typography variant="h6">{product.name}</Typography>
            <Typography>{product.price} {product.dimension}</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleViewDetails(product)} 
              style={{ marginTop: 10 }}
            >
              Ver Detalhes
            </Button>
          </Box>
        ))}
      </Box>

      {selectedProduct && (
        <Modal
          open={Boolean(selectedProduct)}
          onClose={handleCloseModal}
          aria-labelledby="product-description-modal"
          aria-describedby="product-description-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              maxWidth: 600,
              width: '80%',
            }}
          >
            <Typography variant="h5" gutterBottom>{selectedProduct.name}</Typography>
            <Typography variant="body1">{selectedProduct.description}</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
              style={{ marginTop: 20 }}
            >
              Fechar
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default ProductList;
