import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, DialogContentText,Card, CardContent, Typography, CardActions} from "@mui/material";
import Box from '@mui/material/Box';
import MuiAlert from "@mui/material/Alert";

function AddEmployeeDialog({ open, onClose, onSubmit }) {
  const [employee, setEmployee] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    fecha_ingreso: "",
    fecha_nacimiento: "",
    puesto: "",
    salario: "",
    usuario: "",
    contraseña: "",
    foto: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleClose = () => {
    onClose();
};
  const [opene, setOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevEmployee => {
        const updatedEmployee = {
            ...prevEmployee,
            [name]: value,
        };

        // Lógica para auto-generar el usuario en base a nombre, apellido_paterno y fecha_nacimiento
        if (name === 'nombre' || name === 'apellido_paterno' || name === 'fecha_nacimiento') {
            const nombre = updatedEmployee.nombre || '';
            const apellido = updatedEmployee.apellido_paterno || '';
            const fechaNacimiento = updatedEmployee.fecha_nacimiento || '';
            
            if (nombre && apellido && fechaNacimiento) {
                const nombreInicial = nombre.length > 1 ? nombre.substring(0, 2) : nombre;
                const apellidoInicial = apellido.length > 1 ? apellido.substring(0, 2) : apellido;
                
                const date = new Date(fechaNacimiento);
                const dayMonth = `${date.getDate()}${date.getMonth() + 1}`;
                updatedEmployee.usuario = `${nombreInicial}${apellidoInicial}${dayMonth}`.toLowerCase();
            }
        }

        return updatedEmployee;
    });
};
const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
};

const handleSubmit = async () => {
    try {
        await onSubmit(employee);
        handleOpenSnackbar(); 
        onClose(); 
    } catch (error) {
        console.error("Error al agregar empleado:", error);
    }
};
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setOpenSnackbar(false);
};
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setEmployee({
                ...employee,
                foto: reader.result.split(",")[1],
            });
        };
        reader.readAsDataURL(file);
    }
};

  return (
    <div>
         <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Añadir Nuevo Empleado</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="apellido_paterno"
                            label="Apellido Paterno"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="apellido_materno"
                            label="Apellido Materno"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <TextField
                                margin="dense"
                                name="fecha_ingreso"
                                label="Fecha de Ingreso"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange}
                                sx={{ width: '48%' }}
                            />
                            <TextField
                                margin="dense"
                                name="fecha_nacimiento"
                                label="Fecha de Nacimiento"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChange}
                                sx={{ width: '48%' }}
                            />
                        </Box>
                        <TextField
                            margin="dense"
                            name="puesto"
                            label="Puesto"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="salario"
                            label="Salario"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="usuario"
                            label="Usuario"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={employee.usuario || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="contraseña"
                            label="Contraseña"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={employee.usuario || ''}
                            onChange={handleChange}
                        />
                        <TextField
                            type="file"
                            onChange={handleFileChange}
                            name="foto"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSubmit}>Añadir</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                Empleado añadido correctamente!
            </MuiAlert>
        </Snackbar>
    </div>
  );
}

export default AddEmployeeDialog;
