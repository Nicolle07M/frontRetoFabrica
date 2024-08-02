import axios from 'axios';

const endpoint = 'http://localhost:3005/users';

// Obtener todos los usuarios
export const getAllUsers = async () => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw error;
    }
};

// Eliminar un usuario por ID
export const deleteUserById = async (id) => {
    try {
        await axios.delete(`${endpoint}/${id}`);
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw error;
    }
};

// Actualizar un usuario
export const updateUser = async (id, userData) => {
    try {
        await axios.put(`${endpoint}/${id}`, userData);
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw error;
    }
};
