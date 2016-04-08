// TODO is it really necessary to import React? move it to component(...)?
import {component, React} from 'efficiently-core';

// components: framework + custom
import {Ewb, Field, Dialog, Button, Modal} from 'efficiently-components';
import MyForm from './myForm';

// actions
import {server, submit, dialogAction} from 'efficiently-actions';

export default component((state, dispatch, self) => (
  <Ewb actions={state.ewb.actions} title={state.ewb.title} onSubmit={() => window.alert("submitting form")}>
    <h1>Testtitel</h1>
    <MyForm></MyForm>
    <Dialog
      title="Super major feedback question"
      actions={[dialogAction('reallyClose', 'Yes, CLOSE the thing!')]}
      hidden={!state.wantToClose}>
      Do you really want to close?
    </Dialog>
  </Ewb>
));
