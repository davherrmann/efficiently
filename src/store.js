
import {createStore as createReduxStore, combineReducers, applyMiddleware, compose} from 'redux';
import reduceForm from './reducers/reduceForm';
import applyNewState from './reducers/applyNewState';
import Immutable from 'seamless-immutable';
import createLogger from 'redux-logger';
import { modelReducer as createModelReducer, formReducer as createFormReducer } from 'react-redux-form';
import thunk from 'redux-thunk';

const logger = createLogger({collapsed: true});
const modelReducer = createModelReducer('clientSideFormData');
const formReducer = createFormReducer('clientSideFormMetaData');
const viewReducer = (state, action) => {
  if ("initView" === action.type) {
    return action.view;
  }
  return state;
}

const clientReducers = (state = {}, action) => {
  let clientState = Immutable(state)
    // .set("user", modelReducer(state.user, action))
    .set("clientSideFormMetaData", formReducer(state.clientSideFormMetaData, action));

  if (action.type === "initView") {
    clientState = Immutable(clientState).set("clientSideViewMetaData", viewReducer(state.clientSideViewMetaData, action));
  }

  let mergedState = applyNewState(clientState, action);
  return modelReducer(mergedState, action);
}

export function createStore(serverDispatch) {
  const appliedMiddleware = serverDispatch
    ? applyMiddleware(thunk, logger, serverDispatch)
    : applyMiddleware(thunk, logger);
  const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
  return createReduxStore(clientReducers, {}, compose(appliedMiddleware, devTools));
}
