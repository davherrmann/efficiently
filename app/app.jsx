// TODO is it really necessary to import React? move it to component(...)?
import {component, React} from 'efficiently-core';

// components: framework + custom
import {Ewb, Field, Dialog, Button, Modal, Assistant, AssistantPage} from 'efficiently-components';
import MyForm from './myForm';
import Page0 from './page0';
import Page1 from './page1';

// actions
import {server, submit, dialogAction} from 'efficiently-actions';

export default component((state, dispatch, self) => (
  <div>
    <Assistant title={state.assistant.title} actions={state.assistant.actions} currentPage={state.assistant.currentPage}>
      <Page0></Page0>
      <Page1></Page1>
    </Assistant>
    <Dialog
      title="Super major feedback question"
      actions={[dialogAction('reallyClose', 'Yes, CLOSE the thing!')]}
      hidden={!state.wantToClose}>
      Do you really want to close?
    </Dialog>
  </div>
));


/*

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

*/
