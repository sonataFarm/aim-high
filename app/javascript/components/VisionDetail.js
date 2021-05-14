import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { denormalizeEntities } from '../util/normalize';
import Accordion from './Accordion';
import GoalCard from './GoalCard';
import CardGrid from './CardGrid';

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
  },
  cardGridContainer: {
    marginLeft: '20px',
    marginRight: '20px'
  }
};

class VisionDetail extends React.Component {
  get loading() {
    return !this.props.vision;
  }

  render() {
    const { vision, goals } = this.props;

    if (this.loading) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }

    const cards = goals.map(
      (g => <GoalCard key={g.id} goal={g} />)
    );

    return (
      <div className={this.props.classes.container}>
        <div className={this.props.classes.header}>
          <Typography variant="subtitle1" align="center">Vision</Typography>
          <Typography variant="h3" align="center">{vision.title}</Typography>
        </div>
        <div className={this.props.classes.accordionContainer}>
          <Accordion title="Motivation">
            <Typography variant="body2">{vision.motivation}</Typography>
          </Accordion>

          <Accordion title="Impact">
            <Typography variant="body2">{vision.impact}</Typography>
          </Accordion>
        </div>
        <div>
          <Typography 
            style={{ paddingTop: '10px'}} 
            variant="subtitle2" 
            align="center"
            gutterBottom
          >Related Goals</Typography>
          <div className={this.props.classes.cardGridContainer}>
          <CardGrid cards={cards} />
          </div>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => { 
  const vision = state.entities.visions[ownProps.match.params.id];
  let goals;
  if (vision) {
    goals = denormalizeEntities(state.entities.goals).filter(
      g => g.visionId == vision.id
    );
  }

  return { vision, goals };
};

export default withRouter(connect(mapStateToProps)(withStyles(classes)(VisionDetail)));