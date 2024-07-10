import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../img/vs.png';

const Navbar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/');
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
        <img src={logo} alt="logo comin" style={{  height:95 }}>
            </img>
            <h1>PUBG-VERSUS</h1>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Inicio</Button>
            </Link>
            <Link to="/Rifa" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Sorteo</Button>
            </Link>
            <Link to="/RedesSociales" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Sociales</Button>
            </Link>
            <Link to="/SolicitudesRetiro" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Dashboard</Button>
            </Link>
            <Link to="/SolicitudesDeposito" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Mi cuenta</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>Salir</Button>
          </Box>
          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  bgcolor: "#242b2d40",
                  color:"white",
                  marginTop: 9
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Inicio
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/Rifa" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sorteo
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/RedesSociales" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sociales
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/SolicitudesRetiro" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/SolicitudesDeposito" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Mi cuenta
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button color="inherit" onClick={handleLogout}>Salir</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
