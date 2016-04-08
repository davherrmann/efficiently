import {React, component} from 'efficiently-core';
import { Field, Button, FormGroup, Form } from 'efficiently-components';

export default component((state, dispatch) => (
  <Form>
    <FormGroup>
      <Field type="text" cols="2,4" label="First Name" placeholder="First Name..." model="user.1" form={state.userForm}></Field>
      <Field type="text" cols="2,2" label="Last Name" placeholder="Last Name..." model="user.2" form={state.userForm}></Field>
    </FormGroup>

    <FormGroup>
      <Field type="text" cols="2,4" label="First Name" placeholder="First Name..." model="user.3" form={state.userForm}></Field>
      <Field type="text" cols="2,2" label="Last Name" placeholder="Last Name..." model="user.4" form={state.userForm}></Field>
    </FormGroup>

    <FormGroup>
      <Field type="text" cols="2,4" label="First Name" placeholder="First Name..." model="user.5" form={state.userForm}></Field>
      <Field type="text" cols="2,2" label="Last Name" placeholder="Last Name..." model="user.6" form={state.userForm}></Field>
    </FormGroup>

    <FormGroup>
      <Field type="text" cols="2,4" label="First Name" placeholder="First Name..." model="user.7" form={state.userForm}></Field>
      <Field type="text" cols="2,2" label="Last Name" placeholder="Last Name..." model="user.8" form={state.userForm}></Field>
    </FormGroup>

    <FormGroup>
      <Field type="text" cols="2,4" label="Email" placeholder="Email..." model="user.9" form={state.userForm}></Field>
      <Button>
        Log in as { state.user.username }
      </Button>
    </FormGroup>

  </Form>
));
