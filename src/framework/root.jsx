import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '../store';

import Loader from './loader';

// actions
import {server, initState} from '../actions';

export function initEfficiently(reactElement, ContentComponent) {
  store.dispatch(server(initState()));

  render(
    <Provider store={store}>
      <Loader contentComponent={ContentComponent}></Loader>
    </Provider>,
    reactElement
  );
}
