import Immutable from 'seamless-immutable';

const initialState = Immutable({
  ewb: {
    actions: ["print", "close", "save"],
    title: "MyEWB"
  },
  assistant: {
    actions: ["print", "close", "save"],
    title: "MyAssistant",
    currentPage: 0
  },
  wantToClose: false,
  initialData: {
    firstName: "David",
    lastName: "Herrmann",
    email: "davherrmann@googlemail.com"
  }
})

export default (state = initialState, action) => {

  // debug state - super simple
  /* if (true) {
    return debugState;
  } */

  switch (action.type) {
    case "ewbAction":
      // return a new object! otherwise store will not notify subscribers!
      if (action.action === 'close') {
        return state.set('wantToClose', true);
      }
      if (action.action === 'save') {
        return state.setIn(['ewb', 'actions'], ["print", "close"]);
      }
      return state;

    case "tryClose":
      return state.set("wantToClose", true);

    case "close":
      return state.set("wantToClose", false);

    case "dialogAction":
      if (action.actionId === 'reallyClose') {
        return state.set("wantToClose", false);
      }
      return state;

    case "assistantAction":
      if (action.actionId === 'close') {
        return state.set('wantToClose', true);
      }

      if (action.actionId === 'next') {
        return state.setIn(['assistant', 'currentPage'], state.assistant.currentPage + 1);
      }

      if (action.actionId === 'previous') {
        // TODO who should prevent negative pages?
        return state.setIn(['assistant', 'currentPage'], state.assistant.currentPage - 1);
      }

    default:
      return state;
  }
}
