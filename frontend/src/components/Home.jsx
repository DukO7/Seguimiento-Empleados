import React, { useState } from 'react';
import EmployeeTable from './Empleados';
import AddEmployeeForm from './AddEmployeeForm';
import { Button } from '@mui/material';
import Navbar from './Navbar';
const App = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Navbar />
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Añadir Empleado
            </Button>
            <EmployeeTable />
            <AddEmployeeForm open={open} handleClose={handleClose} />
        </div>
    );
};

export default App;
