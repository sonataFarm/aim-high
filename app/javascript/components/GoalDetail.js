import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { CircularProgress, Divider, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { updateGoal } from '../actions/goal-actions';
import { selectReviewsByGoal, selectObstaclesByGoal } from '../selectors/selectors';
import Accordion from './Accordion';
import EditableTextField from './EditableTextField';
import CardGrid from './CardGrid';
import ReviewCard from './ReviewCard';
import CreateReviewForm from './CreateReviewForm';
import { RemoveCircle } from '@material-ui/icons';
import DeleteButton from './DeleteButton';
import { deleteGoal } from '../actions/goal-actions';
import ObstacleCard from './ObstacleCard';
import CreateObstacleForm from './CreateObstacleForm';
import EditableDate from './EditableDate';

const classes = theme => ({
  mainContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    '& > div': {
      width: '80%'
    }
  },
  header: {
    marginTop: theme.spacing(2)
  },
  headerTop: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '& > div': {
      position: 'absolute',
      top: 0,
      right: 0
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.light,
      '&:hover': {
        color: theme.palette.primary.dark
      }
    }
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  obstaclesContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '10px'
    },
    width: '100%',
    background: theme.palette.grey[100],
    borderRadius: 10,
    '& .MuiFormControl-root': {
      background: 'white'
    }
  },
  monitoringSection: {
    display: 'block',
    width: '100%',
    '& hr': {
      margin: theme.spacing(2)
    },
    '& .section-title': {
      fontWeight: 600
    }
  },
  monitoringContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  deadline: {
    textAlign: 'center',
    margin: theme.spacing(1)
  }
});

class GoalDetail extends React.Component {
  get loading() {
    return (
      !this.props.goal || !this.props.vision  || 
      !this.props.reviews || !this.props.obstacles
    )
  }

  handleUpdate = key => val => {
    const { id } = this.props.goal;
    
    this.props.dispatch(updateGoal({ id, [key]: val }));
  };

  handleDelete = () => {
    this.props.dispatch(deleteGoal(this.props.goal.id));
    this.props.history.push('/goals');
  }

  render() {
    const { goal, vision, obstacles, reviews, needsReview } = this.props;
    const { classes } = this.props;
    
    if (this.loading) {
      return <div><CircularProgress /></div>;
    }

    const reviewCards = reviews.map(r => <ReviewCard review={r} />);
    const obstacleCards = obstacles.map(o => <ObstacleCard obstacle={o} />);

    const deadlineExpired = moment(goal.deadline) < moment();
  
    return (
      <div>
        <div className={classes.mainContentContainer}>
          <div className={classes.header}>
            <div className={classes.headerTop}>
              <Typography variant="h6" align="center">
                <Link to={`/visions/${vision.id}`}>{vision.title}</Link>
              </Typography>
              <DeleteButton 
                confirmMsg="Are you sure you want to delete this goal?" 
                handleDelete={this.handleDelete}
                icon={<RemoveCircle color="disabled" />}
              />
            </div>
            <EditableTextField
              handleUpdate={this.handleUpdate('title')}
              label="Title"
              TypographyProps={{ variant: 'h3', align: 'center', color: 'primary', display: 'block' }}
            >
              {goal.title}
            </EditableTextField>
            <div className={classes.deadline}>
              <EditableDate 
                date={goal.deadline} 
                handleUpdate={this.handleUpdate('deadline')} 
                date={goal.deadline}
              >
                <Typography 
                  variant="body1" 
                  display="inline"
                  color={ deadlineExpired ? 'error' : 'black' }
                > 
                  Deadline: {moment(goal.deadline).format('MMMM DD, YYYY')}
                </Typography>
              </EditableDate>
            </div>
            <EditableTextField
              handleUpdate={this.handleUpdate('description')}
              label="Description"
              TypographyProps={{ variant: 'body2' }}
            >
              {goal.description}
            </EditableTextField>
          </div>
          <div className={classes.accordionContainer}>
            <Accordion title="Motivation">
              <EditableTextField
                handleUpdate={this.handleUpdate('motivation')}
                label="Motivation"
              >{goal.motivation}</EditableTextField>
            </Accordion>
            
            <Accordion title="Impact">
              <EditableTextField
                label="Impact"
                handleUpdate={this.handleUpdate('impact')}
              >{goal.impact}</EditableTextField>
            </Accordion>

            <Accordion title="Strategy">
              <EditableTextField
                label="Strategy"
                handleUpdate={this.handleUpdate('strategy')}
              >{goal.strategy}</EditableTextField>
            </Accordion>

            <Accordion title="Obstacles">
              <div className={classes.obstaclesContainer}>
                <CardGrid 
                  cards={obstacleCards} 
                  breakpoints={{ xs: 12, sm: 12, md: 6 }}
                />
                <CreateObstacleForm />
              </div>
            </Accordion>
            <Accordion title="Monitoring">
              <div className={classes.monitoringContainer}>
                <div className={classes.monitoringSection}>
                  <EditableTextField
                    label="Monitoring"
                    handleUpdate={this.handleUpdate('monitoring')}
                  >
                    {goal.monitoring}
                  </EditableTextField>
                  <Divider />
                </div>
                <div className={classes.monitoringSection}>
                  <Typography variant="overline" display="block">
                    What will you accept as evidence that you are progressing towards your goal?
                  </Typography>
                  <EditableTextField
                    label="Evidence"
                    handleUpdate={this.handleUpdate('evidence')}
                  >
                    {goal.evidence}
                  </EditableTextField>
                  <Divider />
                </div>
                <div className={classes.monitoringSection}>
                  <Typography variant="overline" display="block">
                    How will things in your life have to change for you to feel satisfied in your progress?
                  </Typography>
                  <EditableTextField
                    label="Satisfaction"
                    handleUpdate={this.handleUpdate('satisfaction')}
                  >
                    {goal.satisfaction}
                  </EditableTextField>
                  <Divider />
                </div>
              </div>
            </Accordion>
          </div>
        </div>
        <div>
          <Typography 
            style={{ paddingTop: '10px'}} 
            variant="body2" 
            color="textSecondary"
            align="center"
            gutterBottom
          >Next review due
            { ' ' + moment(goal.nextReviewDate).format('dddd, MMMM Do') }
        </Typography>
        { needsReview ? <CreateReviewForm goal={goal} /> : null }
          <div className={classes.cardGridContainer}>
            <CardGrid cards={reviewCards} />
          </div>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => { 
  const goal = state.entities.goals[ownProps.match.params.id];
  let vision, reviews, obstacles, needsReview;

  if (goal) {
    vision = state.entities.visions[goal.visionId];
    reviews = selectReviewsByGoal(goal.id, state);
    reviews.sort((a, b) => moment(b.created_at).isAfter(a.created_at) ? 1 : -1);
    obstacles = selectObstaclesByGoal(goal.id, state);
  
    const 
      now = moment(),
      nextReviewDate = moment(goal.nextReviewDate);
  
    needsReview = now > nextReviewDate;
  }

  return { goal, vision, reviews, obstacles, needsReview };
};

export default withRouter(connect(mapStateToProps, null)(withStyles(classes)(GoalDetail)));