import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.8:5000/api',
  timeout: 10000,
});
//192.168.180.1
//192.168.0.8
export default api;

