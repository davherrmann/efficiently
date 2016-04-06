import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

// components
import {Field, FormGroup, Button} from 'efficiently-components';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First name is required...';
  }
  return errors;
}

class Form extends Component {
  render() {
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <FormGroup>
          <Field model={firstName} cols="2,4" label="First Name" placeholder="First Name..." type="text"/>
          <Field model={lastName} cols="2,4" label="Last Name" placeholder="Last Name..." type="text"/>
        </FormGroup>
        <FormGroup>
          <Field model={email} cols="2,4" label="Email" placeholder="Email..." type="text"/>
        </FormGroup>
      </form>
    );
  }
}

export default reduxForm({
  form: 'contact',
  validate: validate,
  fields: ['firstName', 'lastName', 'email']
},
state => ({
  state,
  initialValues: state.initialData
})
)(Form);
