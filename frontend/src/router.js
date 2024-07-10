import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/login";
import Empleados from "./components/Empleados";
import Inicio from "./components/Home";
const AppRouter = () => (

  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Empleados" element={<Empleados />} />
      <Route path="/Inicio" element={<Inicio />} />
    </Routes>
  </Router>

);

export default AppRouter;