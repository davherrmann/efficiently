import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from '../store';

import Loader from './loader';
import View from './view';

// actions
import {server, initState, initView} from '../actions';

export function initEfficiently(reactElement, ContentComponent, serverDispatch, components, derivations) {

  const store = createStore(serverDispatch);
  store.dispatch(server(initState()));

  fetch("http://localhost:8081/view")
  .then(res => res.json())
  .then(view => store.dispatch(initView(view)));

  render(
    <Provider store={store}>
      <View components={components} derivations={derivations}/>
    </Provider>,
    reactElement
  );

  // replace <View /> with this for restoring complete sample
  /*<Loader contentComponent={ContentComponent}></Loader>*/
}

export function efficiently() {
  return new Efficiently();
}

class Efficiently {
  constructor() {
    this.components = {};
    this.derivations = {};
  }

  use(module) {
    module(this);
  }

  registerDerivation(name, derivation) {
    this.derivations[name] = derivation;
  }

  registerComponent(name, component) {
    this.components[name] = component;
  }

  // TODO rather: registerMiddleware
  setDispatcher(dispatcher) {
    this.dispatcher = dispatcher;
  }

  start(mount, rootElement) {
    initEfficiently(mount, rootElement, this.dispatcher, this.components, this.derivations);
  }
}
