import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({...employee, [name]: value});
  };

  const handleSubmit = () => {
    onSubmit(employee);
    onClose();
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
                    <MuiAlert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Empleado añadido correctamente!
                    </MuiAlert>
                </Snackbar>
    </div>
  );
}

export default AddEmployeeDialog;
