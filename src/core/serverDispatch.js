import {createStore} from 'redux';
import myReducer from '../reducers/myServerSideReducer';
import {applyStateFromServer} from '../actions';

const serverDispatch = (store) => {

  const serverStore = createStore(myReducer);

  serverStore.subscribe(() => {
    store.dispatch(applyStateFromServer(serverStore.getState()));
  });

  return next => action => {
    if (action.sendToServer !== true) {
      return next(action);
    }
    console.log("sending action to server: " + JSON.stringify(action));
    setTimeout(() => {
      serverStore.dispatch(action);
    }, 100);
    return next(action);
  };
}

export default serverDispatch;
