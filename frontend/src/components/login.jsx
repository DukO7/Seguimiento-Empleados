import React, { useState, useContext } from "react";
import "./css/login.css";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo.png";
import CustomAlert from "./CustomAlert";
import { UserContext } from './Context/UserContext';
import { Dialog, DialogTitle, DialogContent, DialogActions,IconButton, InputAdornment} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openl, setOpenL] = useState(false);
  const [openu, setOpenU] = useState(false);
  const [openc, setOpenC] = useState(false);
  const [open1, setOpen1] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleRegistro = () => {
  //   navigate("/Registro");
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseL = () => {
    setOpenL(false);
  };
  const handleCloseU = () => {
    setOpenU(false);
  };
  const handleCloseC = () => {
    setOpenC(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    // Reinicia el mensaje de error cada vez que se intenta iniciar sesión
    setError("");

    if (!usuario.trim() && !contraseña.trim()) {
      setError("Debe llenar todos los campos.");
      setOpenL(true);
      return;
    }
    if (!usuario.trim()) {
      setError("El campo 'Usuario' es obligatorio.");
      setOpenU(true);
      return;
    }
    if (!contraseña.trim()) {
      setError("El campo 'Contraseña' es obligatorio.");
      setOpenC(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          usuario: usuario,
          contraseña: contraseña,
        }
      );

      if (response.status === 200) {
        const user = response.data;
        sessionStorage.setItem("isLoggedIn", true);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setUser({ user });
          navigate("/inicio");
        }, 2000);
      } else {
        setError("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
        setOpen(true);
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
      setOpen(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <div>
      <CustomAlert visible={showAlert} message="Iniciando Sesión..." />
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <label>Usuario</label>
          </div>
          <div className="user-box">
          <input
            type={showPassword ? "text" : "password"}
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <label>Contraseña</label>
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            style={{ position: 'absolute', right: 0, top: -15, margin: '10px', color: 'white' }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
          <button className="login-button" onClick={handleLogin} >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Iniciar Sesión
          </button>
          <br></br>
          {/* <button className="login-registro" onClick={handleRegistro}>
            Registrarse
          </button> */}
        </form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Incorrecto</DialogTitle>
          <DialogContent>
          {error}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Aceptar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open1} onClose={handleClose1}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
          {error}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Aceptar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openl} onClose={handleCloseL}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
          {error}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseL}>Aceptar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openu} onClose={handleCloseU}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
          {error}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseU}>Aceptar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openc} onClose={handleCloseC}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
          {error}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseC}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="footer">
        <img
          src={logo}
          alt="logo comin"
          style={{
            height: 95,
            filter: "url(#drop-shadow)",
          }}
        />

        <svg height="0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="drop-shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
              <feOffset dx="3" dy="3" result="offsetblur" />
              <feFlood floodColor="rgba(255, 255, 255, 0.7)" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      <div className="footerby">
        <h1>Seguimiento de Empleados</h1>
      </div>
    </div>
  );
};

export default Login;
