import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from '../logo.png';
import './styleAssignTask.css';

const endpoint = 'http://localhost:3005/'; // Asegúrate de que el endpoint esté correcto

const EditTask = () => {
    const { taskId } = useParams();

    const [users, setUsers] = useState([]);
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        user: { idUser: '' }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch users with role ID 3
        axios.get(`${endpoint}/users/employees`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching employees:', error));

        // Fetch the task details
        axios.get(`${endpoint}/tasks/${taskId}`)
            .then(response => {
                setTask({
                    title: response.data.title,
                    description: response.data.description,
                    dueDate: response.data.dueDate,
                    user: response.data.user
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching task:', error);
                setLoading(false);
            });
    }, [taskId]);

    const handleUpdateTask = () => {
        axios.put(`${endpoint}/tasks/${taskId}`, task)
            .then(response => {
                alert('Task updated successfully!');
                // Optionally, you can redirect or perform other actions
            })
            .catch(error => {
                console.error('Error updating task:', error);
                alert('Error updating task.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value
        }));
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
                <h2>Editar tarea</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                        <div>
                            <label>Empleado:</label>
                            <select
                                name="user.idUser"
                                onChange={handleChange}
                                value={task.user.idUser}
                            >
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
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                value={task.title}
                            />
                        </div>
                        <div>
                            <label>Descripción de la tarea:</label>
                            <textarea
                                name="description"
                                onChange={handleChange}
                                value={task.description}
                            />
                        </div>
                        <div>
                            <label>Fecha:</label>
                            <input
                                type="date"
                                name="dueDate"
                                onChange={handleChange}
                                value={task.dueDate}
                            />
                        </div>
                        <button onClick={handleUpdateTask}>Actualizar tarea</button>
                    </>
                )}
            </div>
            <footer className="footer">
                <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default EditTask;
