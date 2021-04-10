import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/'
});

const logIn = user => (
  instance.post('session', { user })
);

const logOut = () => (
  instance.delete('session')
);

const register = user => (
  instance.post('users', { user })
);

const fetchAllGoals = () => (
  instance.get('goals')
);

export default {
  logIn,
  logOut,
  register,
  fetchAllGoals
};