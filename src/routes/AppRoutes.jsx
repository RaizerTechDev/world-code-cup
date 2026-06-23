// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Regulamento from '../pages/Regulamento/Regulamento';
// import Ranking from '../pages/Ranking/Ranking';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regulamento" element={<Regulamento />} />
      {/* <Route path="/ranking" element={<Ranking />} /> */}
    </Routes>
  );
};

export default AppRoutes;