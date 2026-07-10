// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';

import './styles/global.scss'; // Importe seu CSS global aqui

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;