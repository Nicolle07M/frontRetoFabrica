import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../logo.png';
import './stylesEditUser.css';

const endpoint = "http://localhost:3005/users/";

const EditUser = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [roles, setRoles] = useState([]); 
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${endpoint}${id}`);
                const user = response.data;
                // Asignar valores a los campos del formulario
                setValue('name', user.name);
                setValue('lastName', user.lastName);
                setValue('address', user.address);
                setValue('phone', user.phone);
                setValue('email', user.email);
                setValue('status', user.status ? 'Activo' : 'Inactivo');
                setValue('role', user.rol ? user.rol.idRol : ''); 
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        const getRoles = async () => {
            try {
                const response = await axios.get("http://localhost:3005/roles");
                setRoles(response.data); 
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        getUserById();
        getRoles();

    }, [id, setValue]);

    const onSubmit = async (data) => {
        const userData = {
            name: data.name,
            lastName: data.lastName,
            address: data.address,
            phone: data.phone,
            email: data.email,
            status: data.status === 'Activo',
            rol: { idRol: data.role } 
        };

        console.log('Sending user data:', userData);
        try {
            await axios.put(`${endpoint}${id}`, userData);
            navigate('/Users');
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
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
                    <li className="nav-item"><a href="/Users">Regresar</a></li>
                </ul>
            </nav>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Nombre es requerido' })}
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        {...register('lastName', { required: 'Apellido es requerido' })}
                    />
                    {errors.lastName && <span className="error">{errors.lastName.message}</span>}
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        {...register('address', { required: 'Dirección es requerida' })}
                    />
                    {errors.address && <span className="error">{errors.address.message}</span>}
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        {...register('phone', { 
                            required: 'Teléfono es requerido',
                            pattern: {
                                value: /^\d{10}$/,
                                message: 'Teléfono debe contener exactamente 10 números'
                            }
                        })}
                    />
                    {errors.phone && <span className="error">{errors.phone.message}</span>}
                </div>
                <div>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Correo electrónico es requerido' })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        {...register('status', { required: 'Estado es requerido' })}
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                    {errors.status && <span className="error">{errors.status.message}</span>}
                </div>
                <div>
                    <label>Rol:</label>
                    <select
                        {...register('role', { required: 'Rol es requerido' })}
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map((r) => (
                            <option key={r.idRol} value={r.idRol}>{r.rolType}</option>
                        ))}
                    </select>
                    {errors.role && <span className="error">{errors.role.message}</span>}
                </div>
                <button type="submit">Actualizar</button>
            </form>
            <footer className="footer">
                <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default EditUser;
