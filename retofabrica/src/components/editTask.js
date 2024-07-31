import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './stylesRegister.css'; 
import logo from '../logo.png';

const endpoint = 'http://localhost:3005';

const EditTask = () => {
  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchTask();
    fetchUsers(); // Cargar usuarios al montar el componente
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${endpoint}/tasks/${id}`);
      const taskData = response.data;
      setTask(taskData);
      setTitle(taskData.title);
      setDescription(taskData.description);
      setDueDate(taskData.dueDate);
      setStatus(taskData.status);
      setSelectedUser(taskData.user ? taskData.user.idUser : ''); // Asignar el usuario actual
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/employees?roleId=3`); // Obtener empleados
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${endpoint}/tasks/${id}`, {
        title,
        description,
        dueDate,
        status,
        user: { idUser: selectedUser } // Incluir el usuario seleccionado
      });
      navigate('/PanelTask');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!task) return <p>Loading...</p>;

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
      <div className='container'>
        <h1 className='title'>Editar Tarea</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='title'>Título</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Descripción</label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='dueDate'>Fecha de Vencimiento</label>
            <input
              type='date'
              id='dueDate'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Estado</label>
            <select
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value='Pendiente'>Pendiente</option>
              <option value='Completado'>Completado</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='user'>Empleado</label>
            <select
              id='user'
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value=''>Seleccionar empleado</option>
              {users.map(user => (
                <option key={user.idUser} value={user.idUser}>
                  {user.name} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>Actualizar</button>
        </form>
        <footer className="footer">
          <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default EditTask;
