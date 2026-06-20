// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // 🔧 1. Importe o BrowserRouter aqui
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    // 🔧 2. Envolva todo o conteúdo com o BrowserRouter
    <BrowserRouter>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
