import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import { denormalizeEntities } from '../../util/normalize';
import CardGrid from '../shared/CardGrid';
import GoalCard from './GoalCard';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(4)
  }
}));

const GoalsIndex = ({ goals }) => {
  const classes = useStyles();
  const cards = goals.map(g => <GoalCard goal={g} />);
  return (
    <div className={classes.container}>
      <Typography variant="h2" align="center" gutterBottom>
        Goals
      </Typography>
      <CardGrid cards={cards} />
    </div>
  );
}

const mapStateToProps = state => ({
  goals: denormalizeEntities(state.entities.goals)
});

export default connect(mapStateToProps)(GoalsIndex);