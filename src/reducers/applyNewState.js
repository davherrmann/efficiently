import Immutable from 'seamless-immutable';

export default (state = {}, action) => {
  switch (action.type) {
    case 'applyStateFromServer':
      return Immutable(action.state).set('ready', true);
    default:
      return state;
  }
}
