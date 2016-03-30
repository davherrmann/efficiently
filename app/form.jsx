import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

// components
import {Field, FormGroup} from '../components';
import {Button} from 'react-bootstrap';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  return errors;
}

class Form extends Component {
  render() {
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <FormGroup>
          <Field bsStyle={firstName.touched && firstName.error ? "error" : null} labelClassName="col-xs-2" wrapperClassName="col-xs-4" label="First Name" type="text" placeholder="First Name" {...firstName}></Field>
          <Field labelClassName="col-xs-2" wrapperClassName="col-xs-4" label="Last Name" type="text" placeholder="Last Name" {...lastName}></Field>
        </FormGroup>
        <FormGroup>
          <Field labelClassName="col-xs-2" wrapperClassName="col-xs-4" label="Email" type="text" placeholder="Email" {...email}></Field>
        </FormGroup>
      </form>
    );
  }
}

export default reduxForm({
  form: 'contact',
  validate: validate,
  fields: ['firstName', 'lastName', 'email']
})(Form);
