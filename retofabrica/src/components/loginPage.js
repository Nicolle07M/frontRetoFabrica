import React, { useState } from 'react';
import axios from 'axios';
import './stylesLogin.css'; 
import logo from '../logo.png'; 

const endpoint = 'http://localhost:3005';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}/login`, formData); // Actualiza la URL aquí
            if (response.status === 200) {
                alert('Inicio de sesión exitoso');
                // Redirige al usuario o limpia el formulario según sea necesario
            } else {
                alert('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema con el inicio de sesión');
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
                    <li className="nav-item"><a href="/">Inicio</a></li>
                    <li className="nav-item"><a href="/register">Registrate!</a></li>
                </ul>
            </nav>
            <div className="container">
                <main className="main-content">
                    <h1>Iniciar sesión</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="login-button">Iniciar sesión</button>
                    </form>
                </main>
                <footer className="footer">
                    <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
