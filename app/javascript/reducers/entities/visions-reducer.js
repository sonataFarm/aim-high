import { RECEIVE_VISION, RECEIVE_VISIONS } from '../../actions/vision-actions';
import { normalizeEntity, normalizeEntities } from '../../util/normalize';

const VisionsReducer = (state = {}, action) => {  
  switch (action.type) {
    case RECEIVE_VISION: {
      const vision = action.payload;
      return { ...state, [vision.id]: normalizeEntity(vision) }
    }
    case RECEIVE_VISIONS:
      return { ...state, ...normalizeEntities(action.payload) };
    default: 
      return state;
  }
};

export default VisionsReducer;