import Immutable from 'seamless-immutable';
import Merger from '../core/merger';

export default (state = Immutable({}), action) => {
  switch (action.type) {
    case 'applyStateFromServer':
      console.log("got diff");
      console.log(action.state);
      let merged0 = new Merger().merge(state.asMutable({deep: true}), action.state);
      console.log(merged0);
      let merged = Immutable(merged0).set('ready', true);
      console.log(merged);
      return merged;
    default:
      return state;
  }
}
