import Immutable from 'immutable';

export default (state = {}, action) => {
  switch (action.type) {
    case 'applyStateFromServer':
      return action.state.set('ready', true);
    default:
      return state;
  }
}
