import React, {useEffect, useState}from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import logo from '../logo.png'; 



const ShowUsers = () => {

    const endpoint = 'http://localhost:3005'
    const [users, setUsers] = useState([]) 

    useEffect ( () => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const response = await axios.get(`${endpoint}/users`)
        setUsers(response.data)

    }

    const deleteUsers = async (id) => {
       await axios.delete(`${endpoint}/users/${id}`)
       getAllUsers()

    }

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
      <div className='d-grind gap-2'>
        <Link to="/Create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear</Link>
        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>

            </thead>
            <tbody>
                { users.map( (user) =>
                <tr key ={user.idUser}>
                     <td>{user.idUser}</td>
                    <td>{user.name}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link to={`/edit/${user.id}`} className='btn btn-warning'>Editar</Link>
                        <button onClick={ () => deleteUsers(user.id) } className='btn btn-danger'>Eliminar</button>
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
  )
}

export default ShowUsers
