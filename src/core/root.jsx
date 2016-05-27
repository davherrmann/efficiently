import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from '../store';

import Loader from './loader';
import View from './view';

// actions
import {server, initState, initView} from '../actions';

export function initEfficiently(reactElement, ContentComponent, serverDispatch) {

  const store = createStore(serverDispatch);
  store.dispatch(server(initState()));

  fetch("http://localhost:8081/view")
  .then(res => res.json())
  .then(view => store.dispatch(initView(view)));

  render(
    <Provider store={store}>
      <View />
    </Provider>,
    reactElement
  );

  // replace <View /> with this for restoring complete sample
  /*<Loader contentComponent={ContentComponent}></Loader>*/
}
