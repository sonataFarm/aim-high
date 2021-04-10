import React from 'react';
import { connect } from 'react-redux';

import { fetchAllGoals } from '../actions/goal-actions';
import Sidebar from './Sidebar';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchAllGoals();
  }
  
  render() {
    return <div><Sidebar /></div>;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllGoals: goals => dispatch(fetchAllGoals(goals))
});
export default connect(null, mapDispatchToProps)(HomePage);