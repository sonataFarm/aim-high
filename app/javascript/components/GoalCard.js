import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 100,
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
        <Typography variant="h5" component="h2" gutterBottom>
          {goal.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <div className={classes.description}>
            { goal.description }
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>View Goal</Button>
      </CardActions>
    </Card>
  );
};

export default withRouter(GoalCard);