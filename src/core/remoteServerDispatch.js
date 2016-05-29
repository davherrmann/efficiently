import {createStore} from 'redux';
import myReducer from '../reducers/myServerSideReducer';
import {applyStateFromServer} from '../actions';
import Immutable from 'seamless-immutable';
import diff from 'seamless-immutable-diff';
import Differ from './differ';

let lastMergedState = {};
let differ = new Differ();

const serverDispatch = (store) => next => action => {
    if (action.type === "applyStateFromServer") {
      let returnedValue = next(action);
      lastMergedState = store.getState();
      return returnedValue;
    }
    if (action.sendToServer !== true) {
      return next(action);
    }

    if (action.type === "initState") {
      fetch('http://localhost:8081/reset', {
        method: 'POST',
        credentials: 'include'
      });
    }

    console.log('sending action to server: ' + JSON.stringify(action));

    let stateDiff = differ.diff(lastMergedState, store.getState());
    // TODO delete all data which is not hold on server
    delete stateDiff.clientSideFormMetaData;
    delete stateDiff.clientSideViewMetaData;
    console.log("sending state diff:");
    console.log(stateDiff);

    let data = new FormData();
    data.append('json', JSON.stringify(action));

    fetch('http://localhost:8081', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        clientStateDiff: {
          type: "de.davherrmann.efficiently.app.MySpecialState",
          data: stateDiff
        },
        action: action
      })
    })
    .then(res => (res.json()))
    .then(wrapper => store.dispatch(applyStateFromServer(wrapper.data)));

    return next(action);
}

export default serverDispatch;
