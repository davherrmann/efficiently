import {createStore} from 'redux';
import myReducer from '../reducers/myServerSideReducer';
import {applyStateFromServer} from '../actions';
import Immutable from 'seamless-immutable';
import diff from 'seamless-immutable-diff';
import Differ from './differ';

let lastSentState = Immutable({user : Immutable({})});
let differ = new Differ();

const serverDispatch = (store) => next => action => {
    if (action.sendToServer !== true) {
      return next(action);
    }
    console.log('sending action to server: ' + JSON.stringify(action));

    let stateDiff = differ.diff(lastSentState.user, store.getState().user);
    console.log("sending state diff:");
    console.log(stateDiff);
    lastSentState = store.getState();

    let data = new FormData();
    data.append('json', JSON.stringify(action));

    fetch('http://localhost:8081', {
      method: 'POST',
      body: JSON.stringify({
        clientStateDiff: {
          type: "de.davherrmann.efficiently.app.MySpecialState",
          data: {
            user: stateDiff
          }
        },
        action: action
      })
    })
    .then(res => (res.json()))
    .then(wrapper => store.dispatch(applyStateFromServer(wrapper.data)));

    return next(action);
}

export default serverDispatch;
