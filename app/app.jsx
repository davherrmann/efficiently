import React, {Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// framework components
import {Ewb, Field, Dialog} from '../components';
import {Button, Modal} from 'react-bootstrap';

// my components
import Form from './form';

// actions
import {ewbAction, tryCloseEwb, closeEwb, server, submit, dialogAction} from '../actions';

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
      <Ewb actions={ewb.actions} title={ewb.title} onSubmit={() => this.refs.form.submit()}>
        <h1>Test</h1>
        <Form ref="form" onSubmit={data => dispatch(server(submit()))}></Form>
        <Dialog title="Super major feedback question" hidden={!wantToClose} actions={[dialogAction('reallyClose', 'Yes, CLOSE the thing!')]}>
          Do you really want to close?
        </Dialog>
      </Ewb>
    );
  }
}

// avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({
  ewb: state.ewb,
  wantToClose: state.wantToClose
}))(Frame);
