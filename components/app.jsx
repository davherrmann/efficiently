import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';
import Todos from './todos';
import {initState} from '../actions';

let reactElement = document.getElementById('react');

store.dispatch(initState());

render(
  <Provider store={store}>
    <Todos />
  </Provider>,
  reactElement
);
