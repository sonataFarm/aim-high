import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { denormalizeEntities } from '../util/normalize';
import { updateVision, deleteVision } from '../actions/vision-actions';
import Accordion from './Accordion';
import GoalCard from './GoalCard';
import CardGrid from './CardGrid';
import EditableTextField from './EditableTextField';
import DeleteButton from './DeleteButton';
import { RemoveCircle } from '@material-ui/icons';

const classes = theme => ({
  mainContentContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > div': {
      width: '80%'
    }
  },
  header: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
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
  },
  description: {
    width: '60%',
    textAlign: 'center',
    marginBottom: theme.spacing(1)
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // '& > div': {
    //   width: '80%'
    // }
  }
});

class VisionDetail extends React.Component {
  get loading() {
    return !this.props.vision;
  }

  handleUpdate = key => val => {
    const { id } = this.props.vision;
    this.props.dispatch(updateVision({
      id, [key]: val
    }));
  }

  handleDelete = () => {
    this.props.dispatch(deleteVision(this.props.vision));
    this.props.history.push('/goals');
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

    const deleteConfirmMsg = "This action will delete this vision and all of its goals. Are you sure you want to continue?";

    return (
      <div>
        <div className={this.props.classes.mainContentContainer}>
          <div className={this.props.classes.header}>
            <div className={this.props.classes.headerTop}>
              <Typography variant="subtitle1" align="center">Vision</Typography>
              <DeleteButton
                confirmMsg={deleteConfirmMsg}
                handleDelete={this.handleDelete}
                icon={<RemoveCircle color="disabled" />}
              />
            </div>
            <EditableTextField
              handleUpdate={this.handleUpdate('title')}
              label="Title"
              TypographyProps={{ variant: 'h3', align: 'center', color: 'primary', display: 'block' }}
            >
              {vision.title}
            </EditableTextField>
          </div>
          <div className={this.props.classes.description}>
            <EditableTextField
              label="Description"
              handleUpdate={this.handleUpdate('description')}
            >
              {vision.description}
            </EditableTextField>
          </div>

          <div className={this.props.classes.accordionContainer}>
            <Accordion title="Motivation">
              <EditableTextField
                label="Motivation"
                handleUpdate={this.handleUpdate('motivation')}
              >{vision.motivation}</EditableTextField>
            </Accordion>
            <Accordion title="Impact">
              <EditableTextField
                label="Impact"
                handleUpdate={this.handleUpdate('impact')}
              >{vision.impact}</EditableTextField>
            </Accordion>
          </div>
        </div>
        <div>
          <Typography 
            style={{ paddingTop: '10px'}} 
            variant="subtitle2" 
            align="center"
            gutterBottom
          >Related Goals</Typography>
          <CardGrid cards={cards} />
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