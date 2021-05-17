import React from 'react';
import ReactDOM from 'react-dom';
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import Root from '../components/Root';
import configureStore from '../store/store';
import "channels";
import 'fontsource-roboto';

Rails.start();
Turbolinks.start();
ActiveStorage.start();

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