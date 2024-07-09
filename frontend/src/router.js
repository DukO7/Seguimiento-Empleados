import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/login";

const AppRouter = () => (

  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      
    </Routes>
  </Router>

);

export default AppRouter;