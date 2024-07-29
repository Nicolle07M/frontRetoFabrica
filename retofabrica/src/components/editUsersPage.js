import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import logo from '../logo.png';
import './stylesEditUser.css'; // Importar el archivo de estilos

const endpoint = "http://localhost:3005/users/";

const EditUser = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            name: name, 
            lastName: lastName,
            address: address,
            phone: phone,
            email: email,
            status: status
        });
        navigate('/');
    };

    useEffect(() => {
        const getUserById = async () => {
            const response = await axios.get(`${endpoint}${id}`);
            setName(response.data.name);
            setLastName(response.data.lastName);
            setAddress(response.data.address);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setStatus(response.data.status);
        };
        getUserById();
    }, [id]);

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
                    <label>Direccion:</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Telefono</label>
                    <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Correo electronico:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input 
                        type="text" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                    />
                </div>
                <button type="submit">Actualizar!</button>
            </form>
            <footer className="footer">
                <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default EditUser;
