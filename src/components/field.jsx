import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';
import { getField, createFieldClass, controls } from 'react-redux-form';

const ReactBootstrapField = createFieldClass({
  'Input': controls.text
});

const Field = React.createClass({
  render() {
    let {form, model, validators = []} = this.props;
    let field = getField(form, model.split('.').slice(1).join('.'));

    let reactReduxValidators = validators.reduce((prev, curr) => {prev[curr.name] = curr.validate; return prev}, {});

    let helpText = validators.reduce((prev, curr) => {
      return prev + ((field.touched && field.errors[curr.name] && (curr.message + " ") || prev))
    }, "")

    return (
      <ReactBootstrapField
        model={model}
        validators={reactReduxValidators}
        >
        <Input
          standalone
          hasFeedback
          bsStyle={field.touched && !field.valid ? "error" : null}
          help={helpText ? helpText : null}
          labelClassName={"col-xs-" + this.props.cols.split(',')[0]}
          wrapperClassName={"col-xs-" + this.props.cols.split(',')[1]}
          {...this.props}
          />
      </ReactBootstrapField>
    )
  }
});

export default connect()(Field);
