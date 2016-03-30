import Immutable from 'seamless-immutable';

const initialState = Immutable({
  ewb: {
    actions: ["print", "close", "save"],
    title: "MyEWB"
  },
  wantToSubmit: false,
  // form may be reserved for redux-form!
  //form: "test"
})

export default (state = initialState, action) => {
  switch (action.type) {
    case "ewbAction":
      // return a new object! otherwise store will not notify subscribers!
      return state.setIn(['ewb', 'actions'], ["close", "save"]);
    case "trySubmit":
    console.log("reducing trySubmit...");
      return state.set("wantToSubmit", true);
    case "submit":
      return state.set("wantToSubmit", false);
    default:
      return state;
  }
}
