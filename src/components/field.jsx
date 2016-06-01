import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';
import { getField, createFieldClass, controls, actions } from 'react-redux-form';
import {validate, server} from '../actions';

const ReactBootstrapField = createFieldClass({
  'Input': controls.text
});

const Field = React.createClass({
  render() {
    let {form, model, cols = "2,4", type = "text", validators = [], state, validateOn, dispatch} = this.props;
    form = form || state && state["clientSideFormMetaData"];
    let field = model && getField(form, model.split('.').slice(1).join('.')) || {};

    let reactReduxValidators = validators.reduce((prev, curr) => {prev[curr.name] = curr.validate; return prev}, {});
    validateOn ? reactReduxValidators["remoteValidation"] = () => (dispatch(server(validate(model))) || true) : undefined;

    let helpText = validators.reduce((prev, curr) => {
      return prev + ((field.touched && field.errors[curr.name] && (curr.message + " ") || prev))
    }, "")

    // TODO use validateOn, don't always send server(validate(...)) on change!
    return (
      <ReactBootstrapField
        model={"clientSideFormData." + model}
        changeAction={(extendedModel, value) => (dispatch) => {
          dispatch(actions.change(extendedModel, value));
          dispatch(server(validate(model)));
        }}
        >
        <Input
          standalone
          hasFeedback
          bsStyle={field.touched && !field.valid ? "error" : null}
          help={helpText ? helpText : null}
          labelClassName={"col-xs-" + cols.split(',')[0]}
          wrapperClassName={"col-xs-" + cols.split(',')[1]}
          {...this.props}
          type={type}

          />
      </ReactBootstrapField>
    )
  }
});

export default connect(state => ({state}))(Field);
