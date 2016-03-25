import Immutable from 'immutable';

export default (state = {}, action) => {
  switch (action.type) {
    case 'applyStateFromServer':
      return action.state;
    default:
      return state;
  }
}
