const initialState = {
  ewb: {
    actions: ["print", "close", "save"]
  },
  form: "test"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "ewbAction":
      // return a new object! otherwise store will not notify subscribers!
      return {
        ewb: {
          actions: ["close", "save"]
        },
        form: "test"
      };
    default:
      return state;
  }
}
