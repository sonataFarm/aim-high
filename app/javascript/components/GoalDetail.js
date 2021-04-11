import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import Accordion from './Accordion';

const classes = {
  container: {
    width: '100%',
    height: '100%'
  },
  header: {
    marginTop: '30px',
    marginBottom: '30px'
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > div': {
      width: '80%'
    }
  }
};

class GoalDetail extends React.Component {
  get loading() {
    return !this.props.goal ? true : false
  }

  render() {
    const { goal } = this.props;
    if (this.loading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <Typography variant="subtitle1" align="center">Goal</Typography>
          <Typography variant="h3" align="center">{goal.title}</Typography>
        </div>
        <div className={this.props.classes.accordionContainer}>
          <Accordion title="Motivation">
            <Typography>{goal.motivation}</Typography>
          </Accordion>

          <Accordion title="Impact">
            <Typography>{goal.impact}</Typography>
          </Accordion>

          <Accordion title="Strategy">
            <Typography>{goal.strategy}</Typography>
          </Accordion>

          <Accordion title="Obstacles">
            <Typography>{'TODO'}</Typography>
          </Accordion>

          <Accordion title="Monitoring">
            <Typography>{goal.evidence}</Typography>
          </Accordion>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => ({ 
  goal: state.entities.goals[ownProps.match.params.id]
});

export default withRouter(connect(mapStateToProps, null)(withStyles(classes)(GoalDetail)));