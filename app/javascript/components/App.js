import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { logIn, logOut } from '../actions/session-actions';

const App = ({ currentUser, logIn, logOut }) => {
  const loggedIn = !!currentUser;
  const msg = loggedIn ?
    `Welcome back, ${currentUser.username}!` :
    'No one logged in.'

  const handleClick = () => {
    if (!loggedIn) {
      logIn({ username: 'sonataFarm', password: 123456 });
    } else {
      logOut();
    }
  }

  return (
    <div>
      <div>{msg}</div>
      <button onClick={() => handleClick()}>
        {loggedIn ? "Log Out" : "Log In"}
      </button>
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  logIn: user => dispatch(logIn(user)),
  logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
