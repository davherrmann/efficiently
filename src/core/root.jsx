import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from '../store';
import {whyDidYouUpdate} from 'why-did-you-update'

import Loader from './loader';
import View from './view';

// actions
import {server, initState, initView} from '../actions';

export function initEfficiently(reactElement, serverDispatch, components, derivations) {
  if (process.env.NODE_ENV !== 'production') {
    whyDidYouUpdate(React, { exclude: [ /^Connect/, /^Field/, /^FormGroup/, /^Input/ ] })
  }

  const store = createStore(serverDispatch);
  store.dispatch(server(initState()));

  fetch("http://localhost:8081/view")
  .then(res => res.json())
  .then(view => store.dispatch(initView(view)));

  render(
    <Provider store={store}>
      <View components={components} derivations={derivations} store={store}/>
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

  start(mount) {
    initEfficiently(mount, this.dispatcher, this.components, this.derivations);
  }
}
