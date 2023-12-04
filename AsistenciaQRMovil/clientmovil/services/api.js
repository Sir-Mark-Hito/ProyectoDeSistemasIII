// services/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; 

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error);
    throw error;
  }
};
