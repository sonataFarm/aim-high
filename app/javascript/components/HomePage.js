import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { fetchAllGoals } from '../actions/goal-actions';
import { fetchAllVisions } from '../actions/vision-actions';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
};

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchAllGoals();
    this.props.fetchAllVisions();
  }
  
  render() {
    return <div className={this.props.classes.container}><Sidebar /><MainContent /></div>;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllGoals: () => dispatch(fetchAllGoals()),
  fetchAllVisions: () => dispatch(fetchAllVisions())
});

export default connect(
  null, mapDispatchToProps
)(withStyles(styles)(HomePage));