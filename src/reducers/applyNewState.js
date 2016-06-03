import Immutable from 'seamless-immutable';

export default (state = Immutable({}), action) => {
  switch (action.type) {
    case 'applyStateFromServer':
      return Immutable(state)
        .merge(action.state, {deep: true})
        .set('ready', true);
    default:
      return state;
  }
}
