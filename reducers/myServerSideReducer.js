import Immutable from 'seamless-immutable';

const initialState = Immutable({
  ewb: {
    actions: ["print", "close", "save"],
    title: "MyEWB"
  },
  wantToClose: false,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case "ewbAction":
      // return a new object! otherwise store will not notify subscribers!
      if (action.action === 'close') {
        return state.set('wantToClose', true);
      }
      return state;

    case "tryClose":
      return state.set("wantToClose", true);

    case "close":
      return state.set("wantToClose", false);

    case "dialogResult":
      if (action.action === 'reallyClose') {
        return state.set("wantToClose", false);
      }
      return state;

    default:
      return state;
  }
}
