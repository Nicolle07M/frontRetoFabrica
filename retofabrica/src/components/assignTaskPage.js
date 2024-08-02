import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import logo from '../logo.png';
import './styleAssignTask.css';

const endpoint = 'http://localhost:3005';

const AssignTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch employees with role ID 3
        axios.get(`${endpoint}/users/employees?roleId=3`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching employees:', error));
    }, []);

    const onSubmit = (data) => {
        const task = {
            title: data.taskTitle,
            description: data.taskDescription,
            dueDate: data.dueDate,
            status: data.status,
            user: { idUser: data.selectedEmployee }  // Asegúrate de que este campo coincida con la entidad en el backend
        };
    
        axios.post(`${endpoint}/tasks`, task)
            .then(response => {
                alert('Task assigned successfully!');
                reset(); // Reset the form after successful submission
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Empleado:</label>
                        <select {...register('selectedEmployee', { required: true })}>
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
                        <input type="text" {...register('taskTitle', { required: true })} />
                    </div>
                    <div>
                        <label>Descripción de la tarea:</label>
                        <textarea {...register('taskDescription', { required: true })} />
                    </div>
                    <div>
                        <label>Fecha:</label>
                        <input type="date" {...register('dueDate', { required: true })} />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select {...register('status', { required: true })}>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Completado">Completado</option>
                        </select>
                    </div>
                    <button type="submit">Asignar tarea</button>
                </form>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default AssignTask;
