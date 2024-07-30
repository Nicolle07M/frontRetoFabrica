import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../logo.png';
import './stylesShowUsers.css'; 

const endpoint = 'http://localhost:3005';

const PanelTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${endpoint}/tasks`); // Usar comillas invertidas para la interpolación
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
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
          <li className="nav-item"><a href="/AssignTask">Asignar Tarea</a></li>
        </ul>
      </nav>
      <div className='container'>
        <h1 className='title'>Lista de asignación de tareas</h1>
        <table className='task-table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Fecha de vencimiento</th>
              <th>Status</th>
              <th>Empleado Encargado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.idTask}>
                <td>{task.idTask}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>{task.user ? `${task.user.name} ${task.user.lastName}` : 'N/A'}</td>
                <td>
                  <button className='btn btn-warning'>Editar</button>
                  <button className='btn btn-danger'>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="footer">
          <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default PanelTask;
