import React, { useEffect, useState } from "react";
import { DataGrid,GridActionsCellItem } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import axios from "axios";
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogTitle,Snackbar,DialogContentText} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeTable = () => {
    useEffect(() => {
        fetchEmployees();
    }, []);

    const [open, setOpen] = useState(false);
    const [openedit, setOpenEdit] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseEdit = () => setOpenEdit(false);
    const [employees, setEmployees] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleEdit = (row) => {
        console.log('Row data:', row);
        setEditData(row);
        setOpenEdit(true);
    };
    const handleDelete = (id) => {
        console.log('id data:', id);
    setUserIdToDelete(id);
    setOpenDeleteDialog(true);
};

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEmployee({
                    ...employee,
                    foto: reader.result.split(",")[1], // Guarda solo la parte base64, sin el prefijo de datos
                });
            };
            reader.readAsDataURL(file);
        }
    };
    // Campos de almacenamiento para insertar nuevo empleado
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
    // Campos de almacenamiento para editar empleado
    const [editData, setEditData] = useState({
        id: '',
        nombre: '',
        apellido_paterno: '',
        salario: ''
    });
    
    const handleSave = async () => {
        console.log(editData);
        
        const apiUrl = 'http://localhost:5000/empleado/' + editData.uuid;
        try {
            const response = await axios.put(apiUrl, editData);
            if (response.status === 200) {
                console.log('Datos actualizados con éxito:', response.data);
                await fetchEmployees();
                setOpenSnackbarEdit(true);
                handleCloseEdit();
                
            }
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            // Manejar errores, por ejemplo, mostrando un mensaje al usuario
        }
    };

    const handleDeleteServ = async () => {
        console.log('se ejecuta');
        if (userIdToDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/empleadodelete/${userIdToDelete}`);
                console.log('Usuario eliminado:', response.data);
                // Aquí puedes también actualizar el estado para reflejar la eliminación en la UI
                setOpenDeleteDialog(false);
                setUserIdToDelete(null);
                // Opcional: Refrescar los datos o ajustar el estado local
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    };

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSnackbarEdit, setOpenSnackbarEdit] = useState(false);
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeEdit = (event) => {
        const { name, value } = event.target;
        setEditData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/empleado", employee);
            await fetchEmployees();
            setOpenSnackbarEdit(true);
            handleClose();
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
    const handleCloseSnackbarEdit = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarEdit(false);
    };
    ///////////
    

    //Formateo para mostrar fecha en texto en el datagrd
    function formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Fecha inválida";
        }
        return date.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
    //Llamada para obtener empleados
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Obempleados");
            setEmployees(response.data.map((emp, index) => ({
                ...emp,
                id: index,
                uuid: emp.id 
            })));
            
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };
    //Adaptacion de background y color de columnas
    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgba(255, 255, 255, 0.85)", // Fondo blanco para el DataGrid
                        border: "1px solid #e0e0e0", // Color de borde opcional
                    },
                    columnHeader: {
                        // backgroundColor: '#f0f0f0',  // Color gris claro para los encabezados de las columnas
                        color: "#333", // Color de texto para los encabezados
                        fontWeight: "bold", // Opcionalmente, puedes hacer el texto más bold
                    },
                },
            },
        },
    });
    //Columnas y formateo de datagrid
    const columns = [
        {
           field: "fotografia",
           headerName: "Fotografía",
           width: 90,
           renderCell: (params) => (
            <img
                src={`data:image/jpeg;base64,${params.value}`}
                alt="Foto"
                style={{ height: 50,width:50, borderRadius: "30%" }}
            />
           ),
        },
        { field: "nombre", headerName: "Nombre", width: 130 },
        { field: "apellido_paterno", headerName: "Apellido Paterno", width: 130 },
        { field: "apellido_materno", headerName: "Apellido Materno", width: 130 },
        {
            field: "fecha_ingreso",
            headerName: "Fecha de Ingreso",
            width: 180,
            renderCell: (params) => formatDate(params.value),
        },
        {
            field: "fecha_nacimiento",
            headerName: "Fecha de Nacimiento",
            width: 180,
            renderCell: (params) => formatDate(params.value),
        },
        { field: "edad", headerName: "Edad", width: 80 },
        { field: "puesto", headerName: "Puesto", width: 130 },
        {
            field: "salario",
            headerName: "Salario",
            width: 80,
            renderCell: (params) => `$${params.value.toLocaleString('es-MX')}`, // Formatea el número con comas como separadores de miles
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 130,
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} label="Editar" onClick={() => handleEdit(params.row)} />,
                <GridActionsCellItem icon={<DeleteIcon />} label="Eliminar" onClick={() => handleDelete(params.row.uuid)} />,
            ],
        },
    ];

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Añadir Empleado
            </Button>
            <div
                className="main-visual"
                style={{
                    padding: "20px",
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 64px)",
                }}
            >
                <h1>EMPLEADOS</h1>
                {/* Tabla empleados */}
                <div style={{ height: 400, overflow: "auto" }}>
                    <ThemeProvider theme={theme}>
                        <DataGrid
                            rows={employees}
                            columns={columns}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 20, { value: 100, label: "100" }]}
                            disableSelectionOnClick
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            pagination
                        />
                    </ThemeProvider>
                </div>
            </div>
            <div>
                {/* Modal añadir nuevo empleado */}
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
            <div>
            <Dialog open={openedit} onClose={handleCloseEdit}>
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
                            value={editData.fecha_nacimiento}
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
                            value={editData.fecha_nacimiento}
                            onChange={handleChange}
                        />
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
                    <Button onClick={handleCloseEdit}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                    open={openSnackbarEdit}
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
            <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Estás seguro de que deseas eliminar este usuario?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleDeleteServ} color="primary" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default EmployeeTable;
