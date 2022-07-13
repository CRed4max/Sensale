import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

instance.defaults.timeout = 2500;

instance.get('/longRequest', { timeout: 5000 });

export default instance;
