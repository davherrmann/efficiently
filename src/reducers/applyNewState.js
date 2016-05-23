import Immutable from 'seamless-immutable';
import Merger from '../core/merger';

export default (state = Immutable({}), action) => {
  switch (action.type) {
    case 'applyStateFromServer':
      let merged0 = new Merger().merge(state.asMutable({deep: true}), action.state);
      let merged = Immutable(merged0).set('ready', true);
      return merged;
    default:
      return state;
  }
}
