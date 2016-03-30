import React, {Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// framework components
import {Ewb, Field} from '../components';
import {Button, Modal} from 'react-bootstrap';

// my components
import Form from './form';

import {ewbAction, trySubmit, server, submit} from '../actions';

const initialClientState = {
  ewb: {
    actions: ["print"]
  },
  wantToSubmit: false
};

class Frame extends Component {
  render() {
    const {ewb = initialClientState.ewb, wantToSubmit = initialClientState.wantToSubmit, dispatch} = this.props;
    return (
      <Ewb actions={ewb.actions} title={ewb.title} onSubmit={() => dispatch(server(trySubmit()))}>
        <h1>Test</h1>
        <Form ref={(c) => this._form = c} onSubmit={data => dispatch(server(submit()))}></Form>
        <div hidden={!wantToSubmit}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Super minor feedback question</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              Do you really want to submit?
            </Modal.Body>

            <Modal.Footer>
              <Button bsStyle="primary" onClick={() => this._form.submit()}>Really submit</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </div>
      </Ewb>
    );
  }
}

// avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({
  ewb: state.ewb,
  wantToSubmit: state.wantToSubmit
}))(Frame);
