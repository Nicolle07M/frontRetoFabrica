import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../logo.png';
import './styleAssignTask.css';

const endpoint = 'http://localhost:3005'; // Asegúrate de que el endpoint esté correcto

const AssignTask = () => {
    const [users, setUsers] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        // Fetch employees with role ID 3
        axios.get(`${endpoint}/users/employees?roleId=3`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    const handleAssignTask = () => {
        const task = {
            title: taskTitle,
            description: taskDescription,
            dueDate: dueDate,
            user: { idUser: selectedEmployee }  // Asegúrate de que este campo coincida con la entidad en el backend
        };
    
        axios.post(`${endpoint}/tasks`, task)
            .then(response => {
                alert('Task assigned successfully!');
                setSelectedEmployee('');
                setTaskTitle('');
                setTaskDescription('');
                setDueDate('');
            })
            .catch(error => {
                console.error('Error assigning task:', error);
                alert('Error assigning task.');
            });
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
                    <li className="nav-item"><a href="/PanelTask">Regresar</a></li>
                </ul>
            </nav>
            <div className="assign-task-container">
                <h2>Asignación de tarea</h2>
                <div>
                    <label>Empleado:</label>
                    <select onChange={(e) => setSelectedEmployee(e.target.value)} value={selectedEmployee}>
                        <option value="">Seleccionar empleado</option>
                        {users.map(user => (
                            <option key={user.idUser} value={user.idUser}>
                                {user.name} {user.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Título de la tarea:</label>
                    <input type="text" onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle} />
                </div>
                <div>
                    <label>Descripción de la tarea:</label>
                    <textarea onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
                </div>
                <button onClick={handleAssignTask}>Asignar tarea</button>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default AssignTask;
