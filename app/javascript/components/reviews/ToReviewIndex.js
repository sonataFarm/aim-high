import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import { selectGoalsToReview } from '../../selectors/selectors';
import CardGrid from '../shared/CardGrid';
import GoalCard from '../goals/GoalCard';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4)
  }
}));

const ToReviewIndex = ({ goals }) => {
  const classes = useStyles();
  const cards = goals.map(g => <GoalCard goal={g} />);
  return (
    <div className={classes.container}>
      <Typography variant="h2" align="center" gutterBottom>
        To Review
      </Typography>
      <CardGrid cards={cards} />
    </div>
  );
}

const mapStateToProps = state => ({
  goals: selectGoalsToReview(state)
});

export default connect(mapStateToProps)(ToReviewIndex);