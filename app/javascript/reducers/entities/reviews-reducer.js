import { normalizeEntities } from '../../util/normalize';
import { RECEIVE_GOAL, RECEIVE_GOALS } from '../../actions/goal-actions';
import { RECEIVE_REVIEW } from '../../actions/review-actions';

const ReviewsReducer = (state = {}, action) => {
  let reviews;

  switch (action.type) {
    case RECEIVE_REVIEW:
      const review = action.payload;
      return { ...state, [review.id]: review };
    case RECEIVE_GOAL:
      reviews = action.payload.reviews;
      return { ...state, ...normalizeEntities(reviews) };
    case RECEIVE_GOALS:
      reviews = action.payload.reduce((r, g) => (
        [ ...r, ...g.reviews ]
      ), []);

      return { ...state, ...normalizeEntities(reviews) };
    default: 
      return state;
  }
}

export default ReviewsReducer;