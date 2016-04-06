import {createStore as createReduxStore, combineReducers, applyMiddleware} from 'redux';
import reduceForm from './reducers/reduceForm';
import applyNewState from './reducers/applyNewState';
import Immutable from 'seamless-immutable';
import {reducer as formReducer} from 'redux-form';
import createLogger from 'redux-logger';

const logger = createLogger({collapsed: true});

const clientReducers = (state = {}, action) => {
  let newState = applyNewState(state, action);
  // add other client side reducers here
  return Immutable(newState)
    .set("form1", reduceForm(state.form1, action))
    .set("form2", reduceForm(state.form2, action))
    .set("form", formReducer(state.form, action));
}

export function createStore(serverDispatch) {
  let middleWare = serverDispatch ? applyMiddleware(serverDispatch, logger) : applyMiddleware(logger);
  return createReduxStore(
    clientReducers,
    middleWare
  );
}
