import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/'
});

const logIn = user => (
  instance.post('session', { user: user })
);

const logOut = () => (
  instance.delete('session')
)

export default {
  logIn,
  logOut
};
