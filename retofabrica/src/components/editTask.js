import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './stylesRegister.css'; 
import logo from '../logo.png';

const endpoint = 'http://localhost:3005';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${endpoint}/tasks/${id}`);
      const taskData = response.data;
      // Establecer valores en el formulario
      setValue('title', taskData.title);
      setValue('description', taskData.description);
      setValue('dueDate', taskData.dueDate);
      setValue('status', taskData.status);
      setValue('user', taskData.user ? taskData.user.idUser : '');
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${endpoint}/users/employees?roleId=3`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`${endpoint}/tasks/${id}`, {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        status: data.status,
        user: { idUser: data.user }
      });
      navigate('/PanelTask');
    } catch (error) {
      console.error('Error updating task:', error);
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
          <li className="nav-item"><a href="/PanelTask">Regresar</a></li>
        </ul>
      </nav>
      <div className='container'>
        <h1 className='title'>Editar Tarea</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label htmlFor='title'>Título</label>
            <input
              type='text'
              id='title'
              {...register('title', { required: true })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Descripción</label>
            <textarea
              id='description'
              {...register('description', { required: true })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='dueDate'>Fecha de Vencimiento</label>
            <input
              type='date'
              id='dueDate'
              {...register('dueDate', { required: true })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Estado</label>
            <select
              id='status'
              {...register('status', { required: true })}
            >
              <option value='Pendiente'>Pendiente</option>
              <option value='Completado'>Completado</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='user'>Empleado</label>
            <select
              id='user'
              {...register('user', { required: true })}
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
