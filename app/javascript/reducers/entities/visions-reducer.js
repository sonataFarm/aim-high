import _ from 'lodash';
import { RECEIVE_VISION, RECEIVE_VISIONS, REMOVE_VISION } from '../../actions/vision-actions';
import { REMOVE_GOAL, RECEIVE_GOAL } from '../../actions/goal-actions';
import { normalizeEntity, normalizeEntities } from '../../util/normalize';

const VisionsReducer = (state = {}, action) => {  
  let vision; 

  switch (action.type) {
    case RECEIVE_VISION: {
      const vision = action.payload;
      return { ...state, [vision.id]: normalizeEntity(vision) }
    }
    case RECEIVE_VISIONS:
      return { ...state, ...normalizeEntities(action.payload) };
    case RECEIVE_GOAL:
      const goal = action.payload;
      vision = state[goal.visionId];

      return { ...state, [vision.id]: { 
        ...vision, goals: _.uniq([...vision.goals, goal.id])
      }};
    case REMOVE_GOAL:
      const 
        goalId = action.payload,
        visionId = _.findKey(state, (v => v.goals.includes(goalId)));
      
      vision = state[visionId];
      
      if (!vision)
        return state;

      return { ...state, [visionId]: { 
        ...vision, goals: vision.goals.filter(g => g !== goalId)
      }};
    case REMOVE_VISION:
      const id = action.payload;
      return _.pickBy(state, (v, k) => v.id !== id);
    default: 
      return state;
  }
};

export default VisionsReducer;