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
    type: 'ewbAction/' + action,
  }
}

export function server(action) {
  return Object.assign({sendToServer: true}, action);
}

export function tryCloseEwb() {
  return {
    type: 'tryClose'
  }
}

export function submit() {
  return {
    type: 'submit'
  }
}

export function closeEwb() {
  return {
    type: 'close'
  }
}

export function dialogResult(action) {
  return {
    type: 'dialogResult/' + action,
  }
}

export function dialogAction(actionId, actionName) {
  return {
    type: 'dialogAction/' + actionId,
    actionName
  }
}

export function assistantAction(actionId) {
  return {
    type: 'assistantAction/' + actionId,
  }
}

export function requestNewItems() {
  return {
    type: 'requestNewItems'
  }
}

export function refreshAction() {
  return {
    type: 'refreshAction'
  }
}

export function setState(name) {
  return {
    type: 'setState/'+ name,
    meta: {
      name: name
    }
  }
}

export function initView(view) {
  return {
    type: 'initView',
    view
  }
}

export function anyAction(type) {
  return {type}
}

export function validate(field) {
  return {
    type: "validate/" + field,
  }
}
