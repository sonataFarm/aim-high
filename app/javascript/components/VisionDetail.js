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

class VisionDetail extends React.Component {
  get loading() {
    return !this.props.vision;
  }

  render() {
    const { vision } = this.props;
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
          <Typography variant="subtitle2" align="center">Vision</Typography>
          <Typography variant="h3" align="center">{vision.title}</Typography>
        </div>
        <div className={this.props.classes.accordionContainer}>
          <Accordion title="Motivation">
            <Typography>{vision.motivation}</Typography>
          </Accordion>

          <Accordion title="Impact">
            <Typography>{vision.impact}</Typography>
          </Accordion>
        </div>
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => ({ 
  vision: state.entities.visions[ownProps.match.params.id]
});

export default withRouter(connect(mapStateToProps)(withStyles(classes)(VisionDetail)));