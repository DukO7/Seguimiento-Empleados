import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, DialogContentText,Card, CardContent, Typography, CardActions} from "@mui/material";
import Box from '@mui/material/Box';
import MuiAlert from "@mui/material/Alert";

function AddEmployeeDialog({ open, onClose, onSubmit }) {
    const [editData, setEditData] = useState({
        id: '',
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
  const [openSnackbar, setOpenSnackbarEdit] = useState(false);
  const handleClose = () => {
    onClose(); // Llama directamente a onClose que es la prop para cerrar el diálogo
};
  const [opene, setOpen] = useState(false);
 
const handleOpenSnackbar = () => {
    setOpenSnackbarEdit(true);
};

const handleSave = async () => {
    try {
        await onSubmit(editData);
        handleOpenSnackbar(); // Abre el Snackbar si la solicitud es exitosa
        onClose(); // Cierra el diálogo
    } catch (error) {
        console.error("Error al agregar empleado:", error);
    }
};
const handleCloseSnackbarEdit = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    setOpenSnackbarEdit(false);
};
// const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setEmployee({
//                 ...employee,
//                 foto: reader.result.split(",")[1], // Guarda solo la parte base64, sin el prefijo de datos
//             });
//         };
//         reader.readAsDataURL(file);
//     }
// };
const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({
        ...prevData,
        [name]: value
    }));
};
  return (
    <div>
         <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Editar Empleado</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editData.nombre}
                            onChange={handleChangeEdit}
                        />
                        <TextField
                            margin="dense"
                            name="apellido_paterno"
                            label="Apellido Paterno"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editData.apellido_paterno}
                            onChange={handleChangeEdit}
                        />
                        <TextField
                            margin="dense"
                            name="apellido_materno"
                            label="Apellido Materno"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editData.apellido_materno}
                            onChange={handleChangeEdit}
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
                                value={editData.fecha_ingreso}
                                onChange={handleChangeEdit}
                                sx={{ width: '48%' }} // Establece un ancho que permita que ambos TextField quepan en una sola línea
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
                                onChange={handleChangeEdit}
                                sx={{ width: '48%' }} // Establece un ancho que permita que ambos TextField quepan en una sola línea
                            />
                        </Box>
                        <TextField
                            margin="dense"
                            name="puesto"
                            label="Puesto"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editData.puesto}
                            onChange={handleChangeEdit}
                        />
                        <TextField
                            margin="dense"
                            name="salario"
                            label="Salario"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={editData.salario}
                            onChange={handleChangeEdit}
                        />
                        <TextField
                            margin="dense"
                            name="usuario"
                            label="Usuario"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editData.usuario}
                            onChange={handleChangeEdit}
                        />
                        <TextField
                            margin="dense"
                            name="contraseña"
                            label="Nueva Contraseña"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChangeEdit}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbarEdit}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <MuiAlert
                        onClose={handleCloseSnackbarEdit}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Empleado modificado correctamente!
                    </MuiAlert>
                </Snackbar>
    </div>
  );
}

export default AddEmployeeDialog;
