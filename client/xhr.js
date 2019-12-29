import Axios from 'axios';
import Cookie from 'js-cookie';

const api = Axios.create({
  baseURL: '/api',
});

let token = Cookie.get('access_token') || 'EMPTY';

api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
export default api;
