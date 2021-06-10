import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  description: {
    display: '-webkit-box',
    lineClamp: 4,
    boxOrient: 'vertical',
    height: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const GoalCard = ({ goal, history }) => {
  const classes = useStyles();

  const handleClick = () => {
    history.push(`/goals/${goal.id}`);
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Goal
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          {goal.title}
        </Typography>
          <div className={classes.description}>
            <Typography className={classes.pos} color="textSecondary">
              { goal.description }
            </Typography>
          </div>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          // variant="outlined" 
          onClick={handleClick}
        >
          View Goal
        </Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(GoalCard);