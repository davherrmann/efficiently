import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';
import { getField, createFieldClass, controls, actions } from 'react-redux-form';
import {validate, server} from '../actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const ReactBootstrapField = createFieldClass({
  'Input': controls.text
});

const Field = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    let {form, model, cols = "2,4", type = "text", validators = [], state, validateOn, dispatch, valid, error} = this.props;
    form = form || state && state["clientSideFormMetaData"];
    let field = model && getField(form, model.split('.').slice(0, 2).join('.')) || {};

    let reactReduxValidators = validators.reduce((prev, curr) => {prev[curr.name] = curr.validate; return prev}, {});
    validateOn ? reactReduxValidators["remoteValidation"] = () => (dispatch(server(validate(model))) || true) : undefined;

    let helpText = validators.reduce((prev, curr) => {
      return prev + ((field.touched && field.errors[curr.name] && (curr.message + " ") || prev))
    }, "")

    helpText = field.touched && error ? helpText + " " + error : helpText;

    const changeAction = validateOn && validateOn.toLowerCase() === "change"
      ? (extendedModel, value) => (dispatch) => {
          dispatch(actions.change("clientSideFormData." + model + ".value", value));
          dispatch(server(validate(model)));
        }
      : (extendedModel, value) => (dispatch) => {
          dispatch(actions.change("clientSideFormData." + model + ".value", value));
        };

    const onBlurAction = validateOn && validateOn.toLowerCase() === "blur"
      ? () => dispatch(server(validate(model)))
      : undefined;

    // TODO use validateOn, don't always send server(validate(...)) on change!
    return (
      <ReactBootstrapField
        model={"clientSideFormMetaData." + model}
        changeAction={changeAction}
        >
        <Input
          standalone
          hasFeedback
          bsStyle={field.touched && (!field.valid || valid === false) ? "error" : field.touched ? "success" : null}
          help={helpText ? helpText : null}
          labelClassName={"col-xs-" + cols.split(',')[0]}
          wrapperClassName={"col-xs-" + cols.split(',')[1]}
          {...this.props}
          type={type}
          onBlur={onBlurAction}
          />
      </ReactBootstrapField>
    )
  }
});

export default connect(state => ({state}))(Field);
