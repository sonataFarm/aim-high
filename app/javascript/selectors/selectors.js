import { denormalizeEntities } from '../util/normalize';

export const selectReviewsByGoal = (goalId, state) => (
  denormalizeEntities(state.entities.reviews).filter(r => r.goalId === goalId)
);