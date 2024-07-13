import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.png';
import { UserContext } from './Context/UserContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
// console.log('datos:',user);
  const handleLogout = () => {
    logout();  // Llama al método logout del UserContext
    navigate('/');  // Redirige al usuario a la página de inicio de sesión
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: "#242b2d40" }}>
        <Toolbar>
          <img src={logo} alt="logo comin" style={{ height: 45 }} />
          {/* Aquí se muestra el nombre del usuario */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user && `Bienvenido, ${user?.user.nombre}`}
          </Typography>
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/Inicio" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Empleados</Button>
            </Link>
            <Link to="/Beneficiarios" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Beneficiarios</Button>
            </Link>
            
            <Button color="inherit" onClick={handleLogout}>Salir</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
