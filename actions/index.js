export function addTodo(todo) {
  return {
    type: 'addTodo',
    todo
  }
}

export function deleteTodo(index) {
  return {
    type: 'deleteTodo',
    index
  }
}

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
