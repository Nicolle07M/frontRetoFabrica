import React, { useState } from 'react';
import axios from 'axios';
import './stylesRegister.css'; 
import logo from '../logo.png'; 

const endpoint = 'http://localhost:3005'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación para permitir solo números en el campo phone
        if (name === 'phone' && !/^\d*$/.test(value)) {
            return;
        }

        // Validación para permitir solo letras en los campos name y lastName
        if ((name === 'name' || name === 'lastName') && !/^[a-zA-Z\s]*$/.test(value)) {
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de la contraseña
        const password = formData.password;
        const passwordErrors = [];
        if (password.length < 8) {
            passwordErrors.push("La contraseña debe tener al menos 8 caracteres.");
        }
        if (!/\d/.test(password)) {
            passwordErrors.push("La contraseña debe contener al menos un número.");
        }
        if (!/[!@#$%^&*]/.test(password)) {
            passwordErrors.push("La contraseña debe contener al menos un carácter especial.");
        }
        if (passwordErrors.length > 0) {
            alert(passwordErrors.join('\n'));
            return;
        }

        try {
            const response = await axios.post(`${endpoint}/users`, formData);
            if (response.status === 200) {
                alert('Registro exitoso');
                setFormData({
                    name: '',
                    lastName: '',
                    address: '',
                    phone: '',
                    email: '',
                    password: ''
                });
            } else {
                alert('Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema con el registro');
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
                    <li className="nav-item"><a href="/">Inicio!</a></li>
                    <li className="nav-item"><a href="/Login">Log in</a></li>
                </ul>
            </nav>
            <div className="container">
                <main className="main-content">
                    <h1 className='title'>Registrate Aqui!</h1>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido:</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección:</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono:</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="register-button">Registrarse</button>
                    </form>
                </main>
                <footer className="footer">
                    <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default Register;
