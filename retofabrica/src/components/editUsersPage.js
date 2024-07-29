import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../logo.png';
import './stylesEditUser.css';

const endpoint = "http://localhost:3005/users/";


const EditUser = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${endpoint}${id}`);
                setName(response.data.name);
                setLastName(response.data.lastName);
                setAddress(response.data.address);
                setPhone(response.data.phone);
                setEmail(response.data.email);
                setStatus(response.data.status ? 'Activo' : 'Inactivo');
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        

        getUserById();

    }, [id]);

    const update = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            lastName,
            address,
            phone,
            email,
            status: status === 'Activo',
          
        };

        console.log('Sending user data:', userData);
        try {
            await axios.put(`${endpoint}${id}`, userData);
            navigate('/Users');
        } catch (error) {
            console.error('Error updating user:', error);
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
            <form onSubmit={update}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
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
