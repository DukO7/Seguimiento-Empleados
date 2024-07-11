import React, { useState } from 'react';
import EmployeeTable from './Empleados';
import AddEmployeeForm from './AddEmployeeForm';
import { Button } from '@mui/material';
import Navbar from './Navbar';
const App = () => {
    
    return (
        <div>
            <Navbar />
            <EmployeeTable/>
        </div>
    );
};

export default App;
