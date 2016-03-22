import React from 'react';
import {connect} from 'react-redux';

import NewTodo from './NewTodo';
import {addTodo, deleteTodo} from '../actions';

const Todos = ({todos, dispatch}) => (
  <div>
    <h1>Todos</h1>
      <NewTodo onChange={ e => {
        if (e.keyCode == 13){
          dispatch(addTodo(e.target.value));
          e.target.value = '';
        }
      }} />
    {todos.map((todo, index) => <p key={todo}>{todo}<button onClick={() => dispatch(deleteTodo(index))}>Delete</button></p>)}
  </div>
)

function mapStateToProps(todos) {
  return {
    todos
  }
}

export default connect(mapStateToProps)(Todos);
