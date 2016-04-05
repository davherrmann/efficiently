import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from '../store';
import serverDispatch from './serverDispatch';

import Loader from './loader';

// actions
import {server, initState} from '../actions';


export function initEfficiently(reactElement, ContentComponent, serverDispatch) {

  const store = createStore(serverDispatch);
  store.dispatch(server(initState()));

  render(
    <Provider store={store}>
      <Loader contentComponent={ContentComponent}></Loader>
    </Provider>,
    reactElement
  );
}
