// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import AllProducts from './pages/AllProducts';
import UserRegistration from './components/UserRegistration'; // Importa o componente
import Orders from './pages/Orders';
import CartPage from './pages/confirmationorder';
import OrdersListPage from './pages/OrdersListPage';
import OrdersPage from './pages/Orders';



function App() {
  return (
    <AuthProvider>
      <Router>


        {/* Adiciona padding para evitar sobreposição com a navbar fixa */}
        <div style={{ paddingTop: '64px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Rota protegida para a página de produtos */}
            <Route
              path="/produtos/get/featured/:count"
              element={
                  <HomePage />
              }
            />

            <Route
              path="/produtos"
              element={
                  <AllProducts />
              }
            />

            <Route
              path="/usuarios/register"
              element={
                <UserRegistration />
              }
            />

            <Route
              path="/login"
              element={
                <LoginPage />
              }
            />

        <Route
         path="/pedidos" 
         element={<Orders />
         }
          />

        <Route 
        path="/pedidos"
         element={<CartPage 
         />} 
         />

<Route path="/pedido/:orderId" element={<OrdersListPage />} /> {/* Página de detalhes do pedido */}

<Route path="/pedidos" element={<OrdersListPage />} /> {/* Página de pedidos */}
        <Route path="/pedido/:orderId" element={<OrdersPage />} /> {/* Página de detalhes do pedido */}


          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
