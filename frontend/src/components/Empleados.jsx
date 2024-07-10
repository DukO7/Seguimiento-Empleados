import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const theme = createTheme({
        components: {
          MuiDataGrid: {
            styleOverrides: {
              root: {
                backgroundColor: '#fff',  // Fondo blanco para el DataGrid
                border: '1px solid #e0e0e0',  // Color de borde opcional
              },
              columnHeader: {
                backgroundColor: '#f0f0f0',  // Color gris claro para los encabezados de las columnas
                color: '#333',  // Color de texto para los encabezados
                fontWeight: 'bold'  // Opcionalmente, puedes hacer el texto más bold
              }
            }
          }
        }
      });
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Obempleados');
                setEmployees(response.data.map((employee, index) => ({ ...employee, id: index })));
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const columns = [
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido_paterno', headerName: 'Apellido Paterno', width: 150 },
        { field: 'apellido_materno', headerName: 'Apellido Materno', width: 150 },
        { field: 'fecha_ingreso', headerName: 'Fecha de Ingreso', width: 170 },
        { field: 'fecha_nacimiento', headerName: 'Fecha de Nacimiento', width: 170 },
        { field: 'puesto', headerName: 'Puesto', width: 130 },
        { field: 'salario', headerName: 'Salario', width: 130 }
    ];

    return (
        <div style={{ height: 400, width: '70%' }}>
            <ThemeProvider theme={theme}>
            <DataGrid
                rows={employees}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
               
            />
            </ThemeProvider>
        </div>
    );
};

export default EmployeeTable;
