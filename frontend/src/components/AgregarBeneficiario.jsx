import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
function AddBeneficiaryDialog({ open, onClose, onSubmit }) {
    const [beneficiary, setBeneficiary] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        parentesco: ""
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClose = () => {
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBeneficiary(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await onSubmit(beneficiary);
            setOpenSnackbar(true);
            onClose();
        } catch (error) {
            console.error("Error al agregar beneficiario:", error);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Añadir Nuevo Beneficiario</DialogTitle>
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
                        name="parentesco"
                        label="Parentesco"
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Beneficiario añadido correctamente!
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default AddBeneficiaryDialog;
