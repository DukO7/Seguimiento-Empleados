import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, DialogContentText, Card, CardContent, Typography, CardActions } from "@mui/material";
import Box from '@mui/material/Box';
import MuiAlert from "@mui/material/Alert";
import Avatar from '@mui/material/Avatar';
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
    
            // Generar usuario y contraseña basados en los campos especificados
            if (name === 'nombre' || name === 'apellido_paterno' || name === 'fecha_nacimiento') {
                if (updatedEmployee.nombre && updatedEmployee.apellido_paterno && updatedEmployee.fecha_nacimiento) {
                    const nombreInicial = updatedEmployee.nombre.length > 1 ? updatedEmployee.nombre.substring(0, 2) : updatedEmployee.nombre;
                    const apellidoInicial = updatedEmployee.apellido_paterno.length > 1 ? updatedEmployee.apellido_paterno.substring(0, 2) : updatedEmployee.apellido_paterno;
                    
                    const date = new Date(updatedEmployee.fecha_nacimiento);
                    const dayMonth = `${date.getDate()}${date.getMonth() + 1}`;  // +1 porque getMonth() devuelve 0-11
                    const usuarioGenerado = `${nombreInicial}${apellidoInicial}${dayMonth}`.toLowerCase();
                    updatedEmployee.usuario = usuarioGenerado;
                    updatedEmployee.contraseña = usuarioGenerado;  // Establece la contraseña igual al usuario generado
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
            reader.onload = () => {
                setPreviewUrl(reader.result);
                setEmployee(prev => ({ ...prev, foto: reader.result.split(",")[1] }));
            };
            reader.readAsDataURL(file);
        }
    };
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Añadir Nuevo Empleado</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',  // Centra los elementos hijos horizontalmente
                            justifyContent: 'center', // Centra los elementos hijos verticalmente
                            width: '100%',  // Ocupa el ancho completo del contenedor para asegurar la centralización
                            marginTop: 2  // Espacio arriba del botón
                        }}
                    >
                        <Avatar
                            src={previewUrl}
                            sx={{ width: 120, height: 120, marginBottom: 2 }}  // Establece el tamaño del Avatar y margen abajo
                        />
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Subir Imagen
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </Button>
                    </Box>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <TextField
                            margin="dense"
                            name="apellido_paterno"
                            label="Apellido Paterno"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            sx={{ width: '48%' }}
                        />
                        <TextField
                            margin="dense"
                            name="apellido_materno"
                            label="Apellido Materno"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            sx={{ width: '48%' }}
                        />
                    </Box>
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
                        value={employee.contraseña || ''}
                        onChange={handleChange}
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
