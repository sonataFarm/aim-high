import _ from 'lodash';
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
      debugger;
      const 
        goal = action.payload,
        vision = state[goal.visionId];
      return { ...state, [vision.id]: { 
        ...vision, goals: _.uniq([...vision.goals, goal.id])
      }};
    default: 
      return state;
  }
};

export default VisionsReducer;