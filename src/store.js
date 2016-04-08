import {createStore as createReduxStore, combineReducers, applyMiddleware} from 'redux';
import reduceForm from './reducers/reduceForm';
import applyNewState from './reducers/applyNewState';
import Immutable from 'seamless-immutable';
import createLogger from 'redux-logger';
import { modelReducer as createModelReducer, formReducer as createFormReducer } from 'react-redux-form';

const logger = createLogger({collapsed: true});
const modelReducer = createModelReducer('user');
const formReducer = createFormReducer('user');

const clientReducers = (state = {}, action) => {
  let newState = applyNewState(state, action);
  // add other client side reducers here
  return Immutable(newState)
    .set("form1", reduceForm(state.form1, action))
    .set("form2", reduceForm(state.form2, action))
    .set("user", modelReducer(state.user, action))
    .set("userForm", formReducer(state.userForm, action));
}

export function createStore(serverDispatch) {
  let middleWare = serverDispatch ? applyMiddleware(serverDispatch, logger) : applyMiddleware(logger);
  return createReduxStore(
    clientReducers,
    middleWare
  );
}
