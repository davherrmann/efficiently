import {component, React} from 'efficiently-core';
import { Field, Button, FormGroup, Form } from 'efficiently-components';

// TODO inject form into Fields?

let validators = {
  required: {
    name: "required",
    validate: (val) => val && val.length,
    message: "This field is required..."
  },
  lengthGreaterThanFour: {
    name: "lengthGreaterThanFour",
    validate: (val) => val && val.length > 4,
    message: "The length of this field must be greater than four!"
  }
}

export default component((state, dispatch) => (
  <Form>
    <FormGroup>
      <Field type="text" validators={[validators.required, validators.lengthGreaterThanFour]} cols="2,4" label="First Name" placeholder="First Name..." model="user.firstname" form={state.userForm}></Field>
      <Field type="text" cols="2,2" label="Last Name" placeholder="Last Name..." model="user.lastname" form={state.userForm}></Field>
    </FormGroup>

    <FormGroup>
      <Field type="text" cols="2,4" label="Email" placeholder="Email..." model="user.email" form={state.userForm}></Field>
      <Button>
        Log in as { state.user.username }
      </Button>
    </FormGroup>

  </Form>
));
