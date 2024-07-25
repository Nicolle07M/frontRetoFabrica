import React from 'react';
import './stylesWelcome.css'; // Asegúrate de que la ruta es correcta
import logo from '../logo.png'; // Importa la imagen del logotipo

const Welcome = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="nav-logo">
                    <a href="/" className="logo-button">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </a>
                </div>
                <ul className="nav-list">
                    <li className="nav-item"><a href="/Register">Registrate!</a></li>
                    <li className="nav-item"><a href="/Login">Log in</a></li>
                </ul>
            </nav>
            <div className="container">
                <main className="main-content">
                    <h1>¡Bienvenido!</h1>
                    <p>Explora y disfruta de nuestra aplicación React.</p>
                </main>
                <footer className="footer">
                    <p>&copy; 2024 Nick Enterprise. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default Welcome;

