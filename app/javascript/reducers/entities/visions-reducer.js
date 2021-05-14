import { RECEIVE_VISION, RECEIVE_VISIONS } from '../../actions/vision-actions';
import { RECEIVE_GOAL } from '../../actions/goal-actions';
import { normalizeEntity, normalizeEntities } from '../../util/normalize';

const VisionsReducer = (state = {}, action) => {  
  switch (action.type) {
    case RECEIVE_VISION: {
      const vision = action.payload;
      return { ...state, [vision.id]: normalizeEntity(vision) }
    }
    case RECEIVE_VISIONS:
      return { ...state, ...normalizeEntities(action.payload) };
    case RECEIVE_GOAL:
      const 
        goal = action.payload,
        vision = state[goal.visionId];
      if (state[vision.id].goals.includes(goal.id)) {
        return state;
      } else {
        return {
          ...state,
          [vision.id]: {
            ...vision,
            goals: [...vision.goals, goal.id]
          }
        };
      }
    default: 
      return state;
  }
};

export default VisionsReducer;