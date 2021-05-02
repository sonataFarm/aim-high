import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/store';
import './styles/fonts.css'

export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    let preloadedState = {};
    
    if (window.prefetchedData) {
      const { currentUser } = window.prefetchedData;
      preloadedState = {
        session: { currentUser }
      };
    }

    const store = configureStore(preloadedState);

    ReactDOM.render(
      <Root store={store} />,
      document.querySelector('#root')
    );
  });
};