import React, { useState } from 'react';
import EmployeeTable from './Empleados';
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
