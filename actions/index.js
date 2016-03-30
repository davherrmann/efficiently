export function applyStateFromServer(state) {
  return {
    type: 'applyStateFromServer',
    state
  }
}

export function initState() {
  return {
    type: 'initState'
  }
}

export function ewbAction(action) {
  return {
    type: 'ewbAction',
    action
  }
}

export function server(action) {
  return Object.assign({sendToServer: true}, action);
}
