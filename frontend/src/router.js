import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/PaginaNoEncontrada";
import Login from "./components/login";
import Inicio from "./components/VistaE";
import Beneficiarios from "./components/VistaB";
import { UserProvider } from './components/Context/UserContext';
const AppRouter = () => (
<UserProvider>
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Beneficiarios" element={<Beneficiarios />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
  </UserProvider>
);

export default AppRouter;