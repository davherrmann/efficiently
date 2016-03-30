import {createStore, combineReducers, applyMiddleware} from 'redux';
import myReducer from './reducers/myServerSideReducer';
import reduceForm from './reducers/reduceForm';
import applyNewState from './reducers/applyNewState';
import {applyStateFromServer} from './actions';
import Immutable from 'seamless-immutable';
import {reducer as formReducer} from 'redux-form';
import createLogger from 'redux-logger';

const logger = createLogger();

const serverDispatch = store => next => action => {
  if (action.sendToServer !== true) {
    return next(action);
  }
  console.log("sending action to server: " + JSON.stringify(action));
  setTimeout(() => {
    serverStore.dispatch(action);
  }, 1000);
  return next(action);
}

const clientReducers = (state = {}, action) => {
  let newState = applyNewState(state, action);
  // add other client side reducers here
  return Immutable(newState)
    .set("form1", reduceForm(state.form1, action))
    .set("form2", reduceForm(state.form2, action))
    .set("form", formReducer(state.form, action));
}

const clientStore = createStore(
  clientReducers,
  applyMiddleware(serverDispatch, logger)
);

const serverStore = createStore(myReducer);

serverStore.subscribe(() => {
  clientStore.dispatch(applyStateFromServer(serverStore.getState()));
});

export default clientStore;
