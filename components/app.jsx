import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';

// components
import Todos from './todos';
import Ewb from './ewb';
import Form from './form';

// actions
import {initState} from '../actions';

let reactElement = document.getElementById('react');

store.dispatch(initState());

render(
  <Provider store={store}>
    <Ewb actions={["print", "close", "save"]} title="MyEWB">
      <h1>Test</h1>
      <Form>
        <y-field model={{}}/>
        <Todos />
      </Form>
    </Ewb>
  </Provider>,
  reactElement
);
