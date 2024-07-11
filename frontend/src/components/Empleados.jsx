import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import axios from "axios";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, DialogContentText,Card, CardContent, Typography, CardActions} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Box from '@mui/material/Box';
const EmployeeTable = () => {
    useEffect(() => {
        fetchEmployees();
    }, []);

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

    const [verData, setVerData] = useState({
        usuario: "",
        contraseña: "",

    });

    const handleSave = async () => {
        console.log('datos a enviar', editData);

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

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openSnackbarEdit, setOpenSnackbarEdit] = useState(false);
    const [openSnackbarEliminar, setOpenSnackbarEliminar] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => {
            const updatedEmployee = {
                ...prevEmployee,
                [name]: value,
            };

            if (name === 'nombre' || name === 'apellido_paterno' || name === 'fecha_nacimiento') {
                if (updatedEmployee.nombre && updatedEmployee.apellido_paterno && updatedEmployee.fecha_nacimiento) {
                    // Asegurarse de que ambos campos tengan al menos dos caracteres
                    const nombreInicial = updatedEmployee.nombre.length > 1 ? updatedEmployee.nombre.substring(0, 2) : updatedEmployee.nombre;
                    const apellidoInicial = updatedEmployee.apellido_paterno.length > 1 ? updatedEmployee.apellido_paterno.substring(0, 2) : updatedEmployee.apellido_paterno;

                    const date = new Date(updatedEmployee.fecha_nacimiento);
                    const dayMonth = `${date.getDate()}${date.getMonth() + 1}`;  // +1 porque getMonth() devuelve 0-11
                    updatedEmployee.usuario = `${nombreInicial}${apellidoInicial}${dayMonth}`.toLowerCase();
                }
            }

            return updatedEmployee;
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
            setOpenSnackbar(true);
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
    const handleCloseSnackbarEliminar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbarEliminar(false);
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
            const newEmployees = response.data.map((emp, index) => ({
                ...emp,
                id: index,  // Asegura un identificador único para cada fila
                uuid: emp.id  // Conserva el UUID original
            }));
            setEmployees(newEmployees);
            setRows(newEmployees); // Usa la variable local para actualizar ambos estados
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
    //Control de Ver modal Beneficiarios
    const handleOpenVerBeneficiarios = () => {
        console.log("Abrir modal para ver beneficiarios");
    };
    //Control de Agregar modal Beneficiarios
    const handleOpenAgregarBeneficiarios = () => {
        console.log("Abrir modal para agregar beneficiarios");
    };
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
                    style={{ height: 50, width: 50, borderRadius: "50%", padding: 2 }}
                />
            ),
        },
        { field: "nombre", headerName: "Nombre", width: 130 },
        { field: "apellido_paterno", headerName: "Apellido Paterno", width: 125 },
        { field: "apellido_materno", headerName: "Apellido Materno", width: 125 },
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
        { field: "puesto", headerName: "Puesto", width: 110 },
        {
            field: "salario",
            headerName: "Salario",
            width: 80,
            renderCell: (params) => `$${params.value.toLocaleString('es-MX')}`,
        },
        {
            field: 'sensible',
            type: 'actions',
            headerName: 'Usuario',
            width: 80,
            getActions: (params) => [
                <Tooltip title="Ver Usuario y Contraseña" placement="top">
                    <GridActionsCellItem icon={<VisibilityIcon sx={{ color: '#353432' }} />} label="Ver" onClick={() => handleVer(params.row)} />
                </Tooltip>
            ],
        },
        {
            field: 'beneficiarios',
            type: 'actions',
            headerName: 'Beneficiarios',
            width: 110,
            getActions: (params) => [
                <Tooltip title="Añadir y ver Beneficiarios" placement="top">
                    <GridActionsCellItem icon={<Diversity3Icon sx={{ color: '#353432' }} />} label="Beneficiarios" onClick={() => handleOpcion(params.row)} />
                </Tooltip>
            ],
        },
        {
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
        },
    ];

    const [filterText, setFilterText] = useState('');
    const [rows, setRows] = useState([]);

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

    return (
        <div>

            <div className="main-visual" style={{ padding: "20px", overflowY: "auto", maxHeight: "calc(100vh - 64px)", }}>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: '-70px', justifyContent: 'space-between', }}>
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        sx={{
                            top: '70px', position: 'relative',
                            backgroundColor: '#db5019', // Color naranja, cambia esto por cualquier color en formato HEX
                            color: 'white', // Texto blanco
                            '&:hover': {
                                backgroundColor: '#e64a19', // Color al pasar el mouse, más oscuro que el original
                            }
                        }}
                    >
                        Añadir Empleado
                    </Button>
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
                <h1>EMPLEADOS</h1>
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
            {/* Modal de usuario y contraseña */}
            <Dialog open={openever} onClose={handleCloseVer}>
                <DialogTitle>Usuario y Contraseña</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="usuario"
                        label="Usuario"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={verData.usuario}

                    />
                    <TextField
                        margin="dense"
                        name="contraseña"
                        label="Contraseña"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={verData.contraseña}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVer}>Cerrar</Button>

                </DialogActions>
            </Dialog>
            {/* Modal prueba */}
            <Dialog open={openopcion} onClose={handleCloseOpcion}>
    <DialogTitle>Selecciona una acción</DialogTitle>
    <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
            <Card sx={{ 
                padding: 2, 
                width: '48%', 
                transition: 'transform 0.3s', // Transición suave para el transform
                '&:hover': {
                    transform: 'scale(1.05)' // Agrandamiento sutil al pasar el ratón
                }
            }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Ver Beneficiarios
                    </Typography>
                    <Typography variant="body2">
                        Consulta la lista de beneficiarios registrados de este empleado.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleOpenVerBeneficiarios}>
                        Abrir
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ 
                padding: 2, 
                width: '48%', 
                transition: 'transform 0.3s', // Transición suave para el transform
                '&:hover': {
                    transform: 'scale(1.05)' // Agrandamiento sutil al pasar el ratón
                }
            }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Agregar Beneficiarios
                    </Typography>
                    <Typography variant="body2">
                        Añade un nuevo beneficiario al sistema.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleOpenAgregarBeneficiarios}>
                        Abrir
                    </Button>
                </CardActions>
            </Card>
        </Box>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseOpcion}>Cerrar</Button>
    </DialogActions>
</Dialog>
        </div>
    );
};

export default EmployeeTable;
