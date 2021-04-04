import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import HomePage from './HomePage';
import LandingPage from './LandingPage';
import { AuthRoute, ProtectedRoute } from './Routes';

const App = () => {
  return (
    <div>
      <Switch>
        <AuthRoute path="/login" component={LandingPage} />
        <ProtectedRoute path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

export default App;