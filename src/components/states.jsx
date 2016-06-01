import React, {Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// components
import {ListGroup, ListGroupItem} from 'react-bootstrap';

// actions
import {setState, initState, server} from '../actions';
import Differ from '../core/differ';

class States extends Component {
  constructor() {
    super();
    this.differ = new Differ();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const diff = this.differ.diff(this.props, nextProps);
    return Object.keys(diff).length !== 0;
  }

  render() {
    const {dispatch, states = []} = this.props;

    return (
      <ListGroup>
        <ListGroupItem onClick={() => dispatch(server(initState()))}>Initialer State</ListGroupItem>
        {Immutable(states).asMutable().map((state, index) => (
          <ListGroupItem key={index} onClick={() => dispatch(server(setState(state.name)))}>{state.title}</ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default connect()(States);
