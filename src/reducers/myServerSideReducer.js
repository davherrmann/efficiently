import Immutable from 'seamless-immutable';

const initialState = Immutable({
  ewb: {
    actions: ["print", "close", "save"],
    title: "MyEWB"
  },
  assistant: {
    actions: ["print", "close", "save"],
    title: "MyAssistant",
    currentPage: 2
  },
  wantToClose: false,
  initialData: {
    firstName: "David",
    lastName: "Herrmann",
    email: "davherrmann@googlemail.com"
  },
  items: [
    {"firstname":"hilla","lastname":"sakala","thumbnail":"https://randomuser.me/api/portraits/thumb/women/32.jpg","email":"hilla.sakala@example.com"},
    {"firstname":"samuel","lastname":"mitchell","thumbnail":"https://randomuser.me/api/portraits/thumb/men/2.jpg","email":"samuel.mitchell@example.com"},
    {"firstname":"helmi","lastname":"ranta","thumbnail":"https://randomuser.me/api/portraits/thumb/women/18.jpg","email":"helmi.ranta@example.com"},
    {"firstname":"ellen","lastname":"silva","thumbnail":"https://randomuser.me/api/portraits/thumb/women/3.jpg","email":"ellen.silva@example.com"},
    {"firstname":"یاسمین","lastname":"گلشن","thumbnail":"https://randomuser.me/api/portraits/thumb/women/74.jpg","email":"یاسمین.گلشن@example.com"},
    {"firstname":"martin","lastname":"gautier","thumbnail":"https://randomuser.me/api/portraits/thumb/men/19.jpg","email":"martin.gautier@example.com"},
    {"firstname":"brooke","lastname":"miles","thumbnail":"https://randomuser.me/api/portraits/thumb/women/4.jpg","email":"brooke.miles@example.com"},
    {"firstname":"elif","lastname":"aydan","thumbnail":"https://randomuser.me/api/portraits/thumb/women/59.jpg","email":"elif.aydan@example.com"},
    {"firstname":"alfred","lastname":"craig","thumbnail":"https://randomuser.me/api/portraits/thumb/men/97.jpg","email":"alfred.craig@example.com"},
    {"firstname":"حامد","lastname":"کریمی","thumbnail":"https://randomuser.me/api/portraits/thumb/men/99.jpg","email":"حامد.کریمی@example.com"},
    {"firstname":"danny","lastname":"torres","thumbnail":"https://randomuser.me/api/portraits/thumb/men/61.jpg","email":"danny.torres@example.com"},
    {"firstname":"hayley","lastname":"walker","thumbnail":"https://randomuser.me/api/portraits/thumb/women/18.jpg","email":"hayley.walker@example.com"},
    {"firstname":"konrad","lastname":"zimmer","thumbnail":"https://randomuser.me/api/portraits/thumb/men/51.jpg","email":"konrad.zimmer@example.com"},
    {"firstname":"lily","lastname":"ross","thumbnail":"https://randomuser.me/api/portraits/thumb/women/16.jpg","email":"lily.ross@example.com"},
    {"firstname":"fernando","lastname":"watts","thumbnail":"https://randomuser.me/api/portraits/thumb/men/48.jpg","email":"fernando.watts@example.com"},
    {"firstname":"alexandre","lastname":"ambrose","thumbnail":"https://randomuser.me/api/portraits/thumb/men/15.jpg","email":"alexandre.ambrose@example.com"},
    {"firstname":"mario","lastname":"bravo","thumbnail":"https://randomuser.me/api/portraits/thumb/men/44.jpg","email":"mario.bravo@example.com"},
    {"firstname":"roméo","lastname":"morin","thumbnail":"https://randomuser.me/api/portraits/thumb/men/93.jpg","email":"roméo.morin@example.com"},
    {"firstname":"leo","lastname":"li","thumbnail":"https://randomuser.me/api/portraits/thumb/men/95.jpg","email":"leo.li@example.com"},
    {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"}
  ],
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
      if (action.action === 'print') {
        return state.set("items", state.items.concat([
          {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
          {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
          {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
          {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
        ]));
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

    case "requestNewItems":
      if (state.items.length > 100) {
        return state;
      }
      return state.set("items", state.items.concat([
        {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
        {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
        {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
        {"firstname":"ayşe","lastname":"tuğlu","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg","email":"ayşe.tuğlu@example.com"},
      ]));

    default:
      return state;
  }
}
