import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sensale.onrender.com',
  withCredentials: true,
});

// baseURL: 'http://localhost:4000'

instance.defaults.timeout = 2500;

instance.get('/longRequest', { timeout: 5000 });

export default instance;
