import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './stylesRegister.css'; 
import logo from '../logo.png'; 

const endpoint = 'http://localhost:3005';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Validación de la contraseña
        const passwordErrors = [];
        if (data.password.length < 8) {
            passwordErrors.push("La contraseña debe tener al menos 8 caracteres.");
        }
        if (!/\d/.test(data.password)) {
            passwordErrors.push("La contraseña debe contener al menos un número.");
        }
        if (!/[!@#$%^&*/?¿]/.test(data.password)) {
            passwordErrors.push("La contraseña debe contener al menos un carácter especial.");
        }
        if (passwordErrors.length > 0) {
            alert(passwordErrors.join('\n'));
            return;
        }

        try {
            const response = await axios.post(`${endpoint}/users`, data);
            if (response.status === 200) {
                alert('Registro exitoso');
                window.location.reload();
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
                    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" id="name" {...register('name', { required: true, pattern: /^[a-zA-Z\s]*$/ })} />
                            {errors.name && <span className="error">Nombre es requerido y debe contener solo letras</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido:</label>
                            <input type="text" id="lastName" {...register('lastName', { required: true, pattern: /^[a-zA-Z\s]*$/ })} />
                            {errors.lastName && <span className="error">Apellido es requerido y debe contener solo letras</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección:</label>
                            <input type="text" id="address" {...register('address', { required: true })} />
                            {errors.address && <span className="error">Dirección es requerida</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono:</label>
                            <input type="text" id="phone" {...register('phone', { 
                                required: true, 
                                pattern: /^\d{10}$/, 
                                message: "Teléfono debe contener exactamente 10 números" 
                            })} />
                            {errors.phone && <span className="error">{errors.phone.message || "Teléfono es requerido y debe contener exactamente 10 números"}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input type="email" id="email" {...register('email', { required: true })} />
                            {errors.email && <span className="error">Correo electrónico es requerido</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" {...register('password', { required: true })} />
                            {errors.password && <span className="error">Contraseña es requerida</span>}
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
