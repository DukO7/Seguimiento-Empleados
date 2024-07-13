import React, { useEffect, useState, useContext } from "react";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, DialogContentText, Card, CardContent, Typography, CardActions } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { UserContext } from './Context/UserContext';
import { useNavigate } from "react-router-dom";
const Beneficiarios = () => {
    const { user } = useContext(UserContext);
    console.log('User1:', user);
    const navigate = useNavigate();
    useEffect(() => {
        console.log('User:', user);
        if (!user) {
            navigate("/");
        } else {
            fetchEmployees();
        }
    }, [user,navigate]);
    
    
    const [open, setOpen] = useState(false);
    const [openedit, setOpenEdit] = useState(false);
    const [openever, setOpenVer] = useState(false);
    const handleCloseVer = () => setOpenVer(false);
    const [openopcion, setOpenOpcion] = useState(false);
    const handleCloseOpcion = () => setOpenOpcion(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseEdit = () => setOpenEdit(false);
    const [employees, setEmployees] = useState([]);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openSnackbarEliminar, setOpenSnackbarEliminar] = useState(false);
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
    const handleVer = (row) => {
        console.log('Row data:', row);
        setVerData(row);
        setOpenVer(true);
    };
    const handleOpcion = (row) => {
        console.log('Row data:', row);
        setVerData(row);
        setOpenOpcion(true);
    };
    const [isAddDialogOpen, setAddDialogOpen] = useState(false);
    const [isAddDialogOpenB, setAddDialogOpenB] = useState(false);
    // Campos de almacenamiento para editar empleado
    const [editData, setEditData] = useState({
        id: '',
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        parentesco:"",
        empleado_id:"",
    });

    const [verData, setVerData] = useState({
        usuario: "",
        contraseña: "",

    });
    
    ///////////
    const handleDeleteServ = async () => {
        console.log('se ejecuta');
        if (userIdToDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/beneficiarios/${userIdToDelete}`);
                console.log('Usuario eliminado:', response.data);
                // Aquí puedes también actualizar el estado para reflejar la eliminación en la UI
                await fetchEmployees();
                setOpenDeleteDialog(false);
                setOpenSnackbarEliminar(true);
                setUserIdToDelete(null);
                // Opcional: Refrescar los datos o ajustar el estado local
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    };
    const handleCloseSnackbarEliminar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarEliminar(false);
    };
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
        const response = await axios.get("http://localhost:5000/beneficiarios");
        const beneficiarios = response.data.map((bene, index) => ({
            ...bene,
            id: index,// Asegura un identificador único para cada fila
            uuid: bene.id 
        }));
        // console.log('Beneficiarios con nombre de empleado:', beneficiarios);
        setEmployees(beneficiarios);
        setRows(beneficiarios);
    } catch (error) {
        console.error("Error fetching beneficiarios:", error);
    }
};
const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditData(prevData => ({
        ...prevData,
        [name]: value
    }));
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
        { field: "empleado_nombre", headerName: "Empleado", width: 130 },
        { field: "nombre", headerName: "Nombre del Beneficiario", width: 180 },
        { field: "apellido_paterno", headerName: "Apellido Paterno Beneficiario", width: 210 },
        { field: "apellido_materno", headerName: "Apellido Materno Beneficiario", width: 210 },
        { field: "parentesco", headerName: "Parentesco", width: 110 },
    ]
    if (user && user?.user.es_admin) {
        columns.push({
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 90,
            getActions: (params) => [
                <Tooltip title="Editar Empleado" placement="top">
                    <GridActionsCellItem icon={<EditIcon sx={{ color: '#243757' }} />} label="Editar" onClick={() => handleEdit(params.row)} />
                </Tooltip>,
                <Tooltip title="Eliminar Empleado" placement="top">
                    <GridActionsCellItem icon={<DeleteIcon sx={{ color: 'red' }} />} label="Eliminar" onClick={() => handleDelete(params.row.uuid)} />
                </Tooltip>,
            ],
        });
    }

    const [filterText, setFilterText] = useState('');
    const [rows, setRows] = useState([]);
    const handleCloseSnackbarEdit = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarEdit(false);
    };
    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterText(value);

        if (value) {
            const filteredRows = rows.filter((row) => {
                return Object.keys(row).some((field) =>
                    String(row[field]).toLowerCase().includes(value.toLowerCase())
                );
            });
            setRows(filteredRows);
        } else {
            // Cuando no hay texto de búsqueda, asegúrate de restablecer a todos los datos
            fetchEmployees(); // Recargar los datos originales
        }
    };
    const handleOpenAddDialog = () => {
        setAddDialogOpen(true);
    };
    const [openSnackbarEdit, setOpenSnackbarEdit] = useState(false);
    const handleSave = async () => {
        console.log('datos a enviar', editData);

        const apiUrl = 'http://localhost:5000/beneficiarios/' + editData.uuid;
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
    return (
        <div>

            <div className="main-visualdub" style={{ padding: "20px", overflowY: "auto", maxHeight: "calc(100vh - 64px)", }}>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: '-70px', }}>
                   
                    <TextField
                        sx={{
                            width: '30%',
                            position: 'relative',
                            top: '70px',
                            '& .MuiInputBase-input': {
                                color: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.85)', // Color blanco con opacidad 50%
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                }
                            }
                        }}
                        fullWidth={false} // Elimina la propiedad fullWidth para permitir el cambio de ancho
                        variant="outlined"
                        placeholder="Buscar..."
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </Box>
                <h1>BENEFICIARIOS</h1>
                {/* Tabla empleados */}
                <div style={{ height: 400, overflow: "auto" }}>

                    <ThemeProvider theme={theme}>
                        <DataGrid
                            rows={rows}
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
                {/* Modal de eliminacion */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este beneficiario?
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
            <Dialog open={openedit} onClose={handleCloseEdit}>
                    <DialogTitle>Editar Beneficiario</DialogTitle>
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
                            name="parentesco"
                            label="Parentesco"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editData.parentesco}
                            onChange={handleChangeEdit}
                        />
                        <TextField
                            margin="dense"
                            name="empleado_id"
                            label="Identificacion Empleado"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={editData.empleado_id}
                            onChange={handleChangeEdit}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Snackbar
                open={openSnackbarEliminar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbarEliminar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <MuiAlert
                    onClose={handleCloseSnackbarEliminar}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Empleado Eliminado correctamente!
                </MuiAlert>
            </Snackbar>
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
    );
};

export default Beneficiarios;
