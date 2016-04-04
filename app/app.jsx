import React from 'react';
import component from '../src/framework/component';

// framework components
import {Ewb, Field, Dialog} from '../src/components';
import {Button, Modal} from 'react-bootstrap';

// my components
import Form from './form';

// actions
import {server, submit, dialogAction} from '../src/actions';

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
  </Ewb>
));
