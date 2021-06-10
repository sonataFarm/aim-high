import React from 'react';
import { Switch } from 'react-router-dom';
import HomePage from './home_page/HomePage';
import LandingPage from './landing_page/LandingPage';
import { AuthRoute, ProtectedRoute } from './shared';

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