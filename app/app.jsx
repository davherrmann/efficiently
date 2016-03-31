import React from 'react';

// framework components
import {Ewb, Field, Dialog} from '../components';
import {Button, Modal} from 'react-bootstrap';

// my components
import Form from './form';
import Test from './test';

import component from '../framework/component';

// actions
import {server, submit, dialogAction} from '../actions';

export default component((state, dispatch) => (
  <Ewb actions={state.ewb.actions} title={state.ewb.title} onSubmit={() => this.refs.form.submit()}>
    <h1>Test</h1>
    <Form
      ref="form"
      onSubmit={data => dispatch(server(submit()))}>
    </Form>
    <Dialog
      title="Super major feedback question"
      actions={[dialogAction('reallyClose', 'Yes, CLOSE the thing!')]}
      hidden={!state.wantToClose}>
      Do you really want to close?
    </Dialog>
    <Test></Test>
  </Ewb>
));
