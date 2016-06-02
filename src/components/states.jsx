import React, {Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

// components
import {ListGroup, ListGroupItem} from 'react-bootstrap';

// actions
import {setState, initState, server} from '../actions';
import Differ from '../core/differ';

class States extends Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
