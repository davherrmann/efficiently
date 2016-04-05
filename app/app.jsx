import React from 'react';
import {component} from 'efficiently/core';

// components: framwork + custom
import {Ewb, Field, Dialog, Button, Modal} from 'efficiently/components';
import Form from './form';

// actions
import {server, submit, dialogAction} from 'efficiently/actions';

export default component((state, dispatch, self) => (
  <Ewb actions={state.ewb.actions} title={state.ewb.title} onSubmit={() => self.refs.form.submit()}>
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
