import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store/store';

export default () => {
  const store = configureStore();
  window.store = store;

  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Root store={store} />,
      document.querySelector('#root')
    );
  });
};
