import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

// components
import Field from '../components/field';

class Form extends Component {
  render() {
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field label="First Name" type="text" placeholder="First Name" {...firstName}></Field>
        <Field label="Last Name" type="text" placeholder="Last Name" {...lastName}></Field>
        <Field label="Email" type="text" placeholder="Email" {...email}></Field>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'contact',
  fields: ['firstName', 'lastName', 'email']
})(Form);
