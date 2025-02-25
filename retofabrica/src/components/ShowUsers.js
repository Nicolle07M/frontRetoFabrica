import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import './stylesShowUsers.css'; // Importar el archivo de estilos

const ShowUsers = () => {
    const endpoint = 'http://localhost:3005';
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${endpoint}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUsers = async (id) => {
        const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
        if (isConfirmed) {
            try {
                await axios.delete(`${endpoint}/users/${id}`);
                getAllUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phone && user.phone.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <nav className="navbar">
                <div className="nav-logo">
                    <a href="/" className="logo-button">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </a>
                </div>
                <ul className="nav-list">
                    <li className="nav-item"><a href="/Login">Crear compañia</a></li>
                </ul>
            </nav>
            <div className='container'>
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o teléfono"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <h1 className='title'>Usuarios del sistema</h1>
                <table className=''>
                    <thead className=''>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) =>
                            <tr key={user.idUser}>
                                <td>{user.idUser}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td>{user.status !== undefined ? (user.status ? 'Activo' : 'Inactivo') : 'No disponible'}</td>
                                <td>{user.rol ? user.rol.rolType : 'No disponible'}</td>
                                <td>
                                    <Link to={`/edit/${user.idUser}`} className='btn btn-warning'>Editar</Link>
                                    <button onClick={() => deleteUsers(user.idUser)} className='btn btn-danger'>Eliminar</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default ShowUsers;
