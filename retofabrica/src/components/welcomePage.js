import React from 'react';
import './stylesWelcome.css'; // Asegúrate de que la ruta es correcta

const Welcome = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="nav-logo">Logo</div>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/about">Registrate!</a></li>
                        <li className="nav-item"><a href="/contact">Log in</a></li>
                    </ul>
            </nav>
        <div className="container">
            <main className="main-content">
                <h1>¡Bienvenido!</h1>
                <p>Explora y disfruta de nuestra aplicación React.</p>
            </main>
            <footer className="footer">
                <p>&copy; 2024 Mi Aplicación React. Todos los derechos reservados.</p>
            </footer>
        </div>
        </div>
    );
};

export default Welcome;
