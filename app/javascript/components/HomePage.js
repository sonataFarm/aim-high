import React from 'react';
import { connect } from 'react-redux';
import { fetchAllGoals } from '../actions/goal-actions';
import { fetchAllVisions } from '../actions/vision-actions';
import Sidebar from './Sidebar';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchAllGoals();
    this.props.fetchAllVisions();
  }
  
  render() {
    return <div><Sidebar /></div>;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllGoals: () => dispatch(fetchAllGoals()),
  fetchAllVisions: () => dispatch(fetchAllVisions())
});

export default connect(null, mapDispatchToProps)(HomePage);