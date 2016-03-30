import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';

// components
import App from '../app/app';

// actions
import {server, initState} from '../actions';

let reactElement = document.getElementById('react');

store.dispatch(server(initState()));

render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  reactElement
);
