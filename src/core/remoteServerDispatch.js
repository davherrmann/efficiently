import {createStore} from 'redux';
import myReducer from '../reducers/myServerSideReducer';
import {applyStateFromServer} from '../actions';

const serverDispatch = (store) => next => action => {
    if (action.sendToServer !== true) {
      return next(action);
    }
    console.log('sending action to server: ' + JSON.stringify(action));

    let data = new FormData();
    data.append('json', JSON.stringify(action));

    fetch('http://localhost:8081', {
      method: 'POST',
      body: JSON.stringify(action)
    })
    .then(res => (res.json()))
    .then(data => store.dispatch(applyStateFromServer(data)));

    return next(action);
}

export default serverDispatch;
