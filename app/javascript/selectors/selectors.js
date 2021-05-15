import moment from 'moment';
import { denormalizeEntities } from '../util/normalize';

export const selectReviewsByGoal = (goalId, state) => (
  denormalizeEntities(state.entities.reviews).filter(r => r.goalId === goalId)
);

export const selectObstaclesByGoal = (goalId, state) => (
  denormalizeEntities(state.entities.obstacles).filter(o => o.goalId === goalId)
);

export const selectGoalsToReview = state => (
  denormalizeEntities(state.entities.goals).filter(g => (
    moment() > moment(g.nextReviewDate)
  ))
);
