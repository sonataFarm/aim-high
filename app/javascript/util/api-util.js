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

const createGoal = goal => (
  instance.post('goals', { goal: {
    ...goal,
    obstaclesAttributes: goal.obstacles
  }})
);

const deleteGoal = id => (
  instance.delete(`goals/${id}`)
)

const fetchGoal = id => (
  instance.get(`goals/${id}`)
);

const fetchAllGoals = () => (
  instance.get('goals')
);

const updateGoal = goal => (
  instance.patch(`goals/${goal.id}`, { goal })
);

const createVision = vision => (
  instance.post('visions', { vision })
);

const fetchAllVisions = () => (
  instance.get('visions')
);

const updateVision = vision => (
  instance.patch(`visions/${vision.id}`, { vision })
);

const deleteVision = id => (
  instance.delete(`visions/${id}`)
);

const createReview = review => (
  instance.post('reviews', { review })
);

const deleteReview = id => (
  instance.delete(`reviews/${id}`)
);

const updateReview = review => (
  instance.patch(`reviews/${review.id}`, { review })
);

export default {
  logIn,
  logOut,
  register,
  createGoal,
  deleteGoal,
  fetchGoal,
  fetchAllGoals,
  updateGoal,
  createVision,
  deleteVision,
  updateVision,
  fetchAllVisions,
  createReview,
  deleteReview,
  updateReview
};