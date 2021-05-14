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

const updateGoal = goal => (
  instance.patch(`goals/${goal.id}`, { goal })
);

const createVision = vision => (
  instance.post('visions', { vision })
);

const updateVision = vision => (
  instance.patch(`visions/${vision.id}`, { vision })
);


const fetchAllVisions = () => (
  instance.get('visions')
);

export default {
  createGoal,
  createVision,
  fetchAllGoals,
  fetchAllVisions,
  logIn,
  logOut,
  register,
  updateGoal,
  updateVision
};

window.updateGoal = updateGoal;