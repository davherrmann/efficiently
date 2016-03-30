import {createStore, combineReducers, applyMiddleware} from 'redux';
import todos from './reducers/todos';
import myReducer from './reducers/myServerSideReducer';
import applyNewState from './reducers/applyNewState';
import {applyStateFromServer} from './actions';

const serverDispatch = store => next => action => {
  if (action.type === 'applyStateFromServer') {
    return next(action);
  }
  console.log("sending action to server: " + JSON.stringify(action));
  setTimeout(() => {
    serverStore.dispatch(action);
  }, 1000);
  return next(action);
}

const clientStore = createStore(
  applyNewState,
  applyMiddleware(serverDispatch)
);

const serverStore = createStore(
  myReducer
)

clientStore.subscribe(() => {
  console.log("new client state: " + JSON.stringify(clientStore.getState()));
});

serverStore.subscribe(() => {
  console.log("new state from server arrived on client side: " + JSON.stringify(serverStore.getState()));
  clientStore.dispatch(applyStateFromServer(serverStore.getState()));
});

export default clientStore;
