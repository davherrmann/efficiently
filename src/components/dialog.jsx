import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// components
import {Button, Modal} from 'react-bootstrap';

// actions
import {dialogResult, server} from '../actions';

const Dialog = ({hidden, dispatch, title, children, actions = []}) => (
  <div hidden={hidden}>
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      <Modal.Footer>
        {Immutable(actions).asMutable().map((action, index) => (
          <Button key={index} bsStyle="primary" onClick={() => dispatch(server(action))}>{action.actionName}</Button>
        ))}
      </Modal.Footer>

    </Modal.Dialog>
  </div>
)

export default Dialog;
