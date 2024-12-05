// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="fixed" style={{ backgroundColor: '#3f51b5' }}>
      <Toolbar style={{ minHeight: '68px' }}> {/* Define a altura mínima do Toolbar */}
        {/* Logo */}
        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
          <Link to="/produtos" style={{ textDecoration: 'none', color: 'white' }}>
            <img
              src="/imagens/image.png" // Caminho da imagem no diretório public
              alt="Logo da Madeireira Sampaio"
              style={{ verticalAlign: 'middle', marginRight: 'max-content', height: '68px' }} // Ajuste a altura da imagem para caber na nova altura
            />
            Madeireira Sampaio
          </Link>
        </Typography>

        {/* Links de Navegação */}
        <Button color="inherit" component={Link} to="/produtos/get/featured/:count" style={{ color: 'white' }}>
          Mais Vendidos
        </Button>
        <Button color="inherit" component={Link} to="/usuarios/register" style={{ color: 'white' }}>
          Registrar-se
        </Button>
        
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
