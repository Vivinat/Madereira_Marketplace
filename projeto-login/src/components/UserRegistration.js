// src/components/UserRegistration.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import { Link } from 'react-router-dom';

function UserRegistration() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    cep: '',
    country: '',
    isAdmin: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/usuarios/register',
        userData,
        {
          headers: {
            'Authorization':
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBkMjk3OGViNjFkM2ZiMWYzMjMzMjUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzE1MzU4MTQsImV4cCI6MTczMTYyMjIxNH0.KluTsshBul7G23yQYpsvr8PFK8vM8sfmIDnwB2yTLHo',
          },
        }
      );

      alert('Usuário cadastrado com sucesso!');
      navigate('/login'); // Após o cadastro, redireciona para a página de login
    } catch (err) {
      setError('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', justifyContent: 'center', padding: 2 }}
    >
      <Typography variant="h5" gutterBottom>Cadastro de Usuário</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={userData.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Telefone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Rua"
          name="street"
          value={userData.street}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Cidade"
          name="city"
          value={userData.city}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="CEP"
          name="cep"
          value={userData.cep}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="País"
          name="country"
          value={userData.country}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        {/* <TextField
          label="Administrador"
          name="isAdmin"
          type="checkbox"
          checked={userData.isAdmin}
          onChange={(e) => setUserData({ ...userData, isAdmin: e.target.checked })}
          margin="normal"
        /> */}
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
          Cadastrar
        </Button>

        <Button color="inherit" component={Link} to="/login" style={{ color: 'blue' }}>
          Já possui conta? Entre já
        </Button>
      </form>
    </Box>
  );
}

export default UserRegistration;
