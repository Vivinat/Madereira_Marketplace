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

function App() {
  return (
    <AuthProvider>
      <Router>


        {/* Adiciona padding para evitar sobreposição com a navbar fixa */}
        <div style={{ paddingTop: '64px' }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            {/* Rota protegida para a página de produtos */}
            <Route
              path="/produtos/get/featured/:count"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/produtos"
              element={
                <ProtectedRoute>
                  <AllProducts />
                </ProtectedRoute>
              }
            />

              <Route
              path="/usuarios/register"
              element={
                <ProtectedRoute>
                  <UserRegistration />
                </ProtectedRoute>
              }
            />


          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
