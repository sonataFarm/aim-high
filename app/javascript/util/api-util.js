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

const createGoal = goal => (
  instance.post('goals', { goal: {
    ...goal,
    obstaclesAttributes: goal.obstacles
  }})
);

const createVision = vision => (
  instance.post('visions', { vision })
);

const fetchAllVisions = () => (
  instance.get('visions')
);

export default {
  createGoal,
  createVision,
  logIn,
  logOut,
  register,
  fetchAllGoals,
  fetchAllVisions
};