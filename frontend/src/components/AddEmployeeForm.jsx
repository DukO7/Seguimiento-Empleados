import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,Snackbar  } from '@mui/material';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
const AddEmployeeForm = ({ open, handleClose }) => {
    const [employee, setEmployee] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        fecha_ingreso: '',
        fecha_nacimiento:'',
        puesto: '',
        salario: '',
        usuario:'',
        contraseña:''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/empleado', employee);
            setOpenSnackbar(true);
            handleClose();  // Cierra el modal después de enviar el formulario
            
        } catch (error) {
            console.error('Error al agregar empleado:', error);
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
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
                <TextField
                    margin="dense"
                    name="fecha_ingreso"
                    label="Fecha de Ingreso"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="fecha_nacimiento"
                    label="Fecha de Nacimiento"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                />
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
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="contraseña"
                    label="Contraseña"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>Añadir</Button>
            </DialogActions>
        </Dialog>
         <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
         <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
             Empleado añadido correctamente!
         </MuiAlert>
     </Snackbar>
     </div>
    );
};

export default AddEmployeeForm;
