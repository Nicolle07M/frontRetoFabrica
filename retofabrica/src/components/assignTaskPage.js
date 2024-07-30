import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../logo.png';
import './styleAssignTask.css'

const AssignTask = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        // Fetch employees with role 'Empleado'
        axios.get('/employees?role=Empleado')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    const handleAssignTask = () => {
        const task = {
            title: taskTitle,
            description: taskDescription,
            dueDate: dueDate,
            employee: { id: selectedEmployee }
        };

        axios.post('/tasks', task)
            .then(response => {
                alert('Task assigned successfully!');
                // Optionally, clear form fields
            })
            .catch(error => console.error('Error assigning task:', error));
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-logo">
                    <a href="/" className="logo-button">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </a>
                </div>
                <ul className="nav-list">
                    <li className="nav-item"><a href="/Login">.</a></li>
                </ul>
            </nav>
            <div className="assign-task-container">
            <h2>Asignacion de tarea</h2>
            <div>
                <label>Empleado:</label>
                <select onChange={(e) => setSelectedEmployee(e.target.value)} value={selectedEmployee}>
                    <option value="">Selecciona Empleado</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Titulo de la tarea:</label>
                <input type="text" onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle} />
            </div>
            <div>
                <label>Descripcion de la tarea:</label>
                <textarea onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} />
            </div>
            <div>
                <label>Fecha:</label>
                <input type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
            </div>
            <button onClick={handleAssignTask}>Asignar tarea!</button>
        </div>
            <footer className="footer">
                <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default AssignTask;
