import { RECEIVE_GOAL, RECEIVE_GOALS } from '../../actions/goal-actions';
import { normalizeEntities } from '../../util/normalize';

const ObstaclesReducer = (state = {}, action) => {
  let obstacles;
  
  switch (action.type) {
    case RECEIVE_GOAL:
      obstacles = action.payload.obstacles;
      return {
        ...state,
        ...normalizeEntities(obstacles)
      };
    case RECEIVE_GOALS:
      obstacles = action.payload.reduce((o, g) => {
        return [ ...o, ...g.obstacles ];
      }, []);

      return {
        ...state,
        ...normalizeEntities(obstacles)
      };
    default: 
      return state;
  }
}

export default ObstaclesReducer;