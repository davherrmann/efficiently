import {createStore as createReduxStore, combineReducers, applyMiddleware} from 'redux';
import reduceForm from './reducers/reduceForm';
import applyNewState from './reducers/applyNewState';
import Immutable from 'seamless-immutable';
import createLogger from 'redux-logger';
import { modelReducer as createModelReducer, formReducer as createFormReducer } from 'react-redux-form';

const logger = createLogger({collapsed: true});
const modelReducer = createModelReducer('clientSideFormData');
const formReducer = createFormReducer('clientSideFormData');
const viewReducer = (state, action) => {
  if ("initView" === action.type) {
    return action.view;
  }
  return state;
}

const clientReducers = (state = {}, action) => {
  let clientState = Immutable(state)
    // .set("user", modelReducer(state.user, action))
    .set("clientSideFormMetaData", formReducer(state.clientSideFormMetaData, action))
    .set("clientSideViewMetaData", viewReducer(state.clientSideViewMetaData, action));

  let mergedState = applyNewState(clientState, action);
  return modelReducer(mergedState, action);
}

export function createStore(serverDispatch) {
  let middleWare = serverDispatch ? applyMiddleware(serverDispatch, logger) : applyMiddleware(logger);
  return createReduxStore(
    clientReducers,
    middleWare
  );
}
