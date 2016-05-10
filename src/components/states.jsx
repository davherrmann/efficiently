import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// components
import {ListGroup, ListGroupItem} from 'react-bootstrap';

// actions
import {setState, initState, server} from '../actions';

const States = ({dispatch, states = []}) => (
  <ListGroup>
    <ListGroupItem onClick={() => dispatch(server(initState()))}>Initialer State</ListGroupItem>
    {Immutable(states).asMutable().map((state, index) => (
      <ListGroupItem key={index} onClick={() => dispatch(server(setState(state.name)))}>{state.title}</ListGroupItem>
    ))}
  </ListGroup>
)

export default connect()(States);
