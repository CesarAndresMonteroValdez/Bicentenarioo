import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
  baseURL: 'http://192.168.0.8:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});
  

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  console.log('Token enviado:', token);
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Sesión expirada o token inválido');
    }
    return Promise.reject(error);
  }
);

export default api;