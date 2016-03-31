import React from 'react';
import {connect} from 'react-redux';

// components
import {Button, Modal} from 'react-bootstrap';

// actions
import {dialogResult, server} from '../actions';

const Dialog = ({hidden, dispatch}) => (
  <div hidden={hidden}>
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Super minor feedback question</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Do you really want to close?
      </Modal.Body>

      <Modal.Footer>
        <Button bsStyle="primary" onClick={() => dispatch(server(dialogResult('reallyClose')))}>Really close</Button>
      </Modal.Footer>

    </Modal.Dialog>
  </div>
)

export default connect()(Dialog);
