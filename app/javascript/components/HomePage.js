import React from 'react';
import { connect } from 'react-redux';

const HomePage = ({ username }) => {
  return <div>Welcome home, {username}!</div>;
};

const mapStateToProps = state => ({
  username: state.session.currentUser.username
});

export default connect(mapStateToProps)(HomePage);