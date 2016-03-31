import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';

import Loader from './loader';

// actions
import {server, initState} from '../actions';

let reactElement = document.getElementById('react');

store.dispatch(server(initState()));

render(
  <Provider store={store}>
    <Loader></Loader>
  </Provider>,
  reactElement
);
