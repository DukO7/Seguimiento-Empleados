import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/login";
import Inicio from "./components/VistaE";
import Beneficiarios from "./components/VistaB";
const AppRouter = () => (

  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Beneficiarios" element={<Beneficiarios />} />
    </Routes>
  </Router>

);

export default AppRouter;