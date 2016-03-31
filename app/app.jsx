import React, {Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// framework components
import {Ewb, Field} from '../components';
import {Button, Modal} from 'react-bootstrap';

// my components
import Form from './form';
import Dialog from './dialog';

import {ewbAction, tryCloseEwb, closeEwb, server, submit} from '../actions';

const initialClientState = {
  ewb: {
    actions: ["print"]
  },
  wantToClose: false
};

class Frame extends Component {
  render() {
    const {ewb = initialClientState.ewb, wantToClose = initialClientState.wantToClose, dispatch} = this.props;
    return (
      <Ewb actions={ewb.actions} title={ewb.title} onSubmit={() => this._form.submit()}>
        <h1>Test</h1>
        <Form ref={(c) => this._form = c} onSubmit={data => dispatch(server(submit()))}></Form>
        <Dialog hidden={!wantToClose} onClick={() => dispatch(server(closeEwb())) } />
      </Ewb>
    );
  }
}

// avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({
  ewb: state.ewb,
  wantToClose: state.wantToClose
}))(Frame);
