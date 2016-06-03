import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createFieldClass, controls, actions } from 'react-redux-form';
import {validate, server} from '../actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import diff from 'seamless-immutable-diff';
import Differ from '../core/differ';
import Immutable from 'seamless-immutable';
import {Input} from 'react-bootstrap';

const ReactBootstrapField = createFieldClass({
  'Input': controls.text
});

const PREFIX = "clientSideFormData.";
const withPrefix = (model) => PREFIX + model;
const withoutPrefix = (model) => model.slice(PREFIX.length);

const dispatchChangeAndValidate = (model, value) => (dispatch) => {
  dispatch(actions.change(model, value));
  dispatch(server(validate(withoutPrefix(model))));
}

const dispatchValidate = (model, value) => (dispatch) => dispatch(server(validate(model)));

class EfficientlyField extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props != nextProps;
  }

  render() {
    const {field, model, cols = "2,4", type = "text", validateOn, dispatch, valid, error, value} = this.props;

    const showValidation = field.touched || field.focus;
    const isInvalid = !field.valid || !valid;

    return (
      <ReactBootstrapField
        model={withPrefix(model)}
        changeAction={validateOn === "CHANGE" ? dispatchChangeAndValidate : undefined}
        >
        <Input
          standalone
          hasFeedback
          bsStyle={showValidation && isInvalid ? "error" : showValidation ? "success" : null}
          help={field.touched && error ? error : null}
          labelClassName={"col-xs-" + cols.split(',')[0]}
          wrapperClassName={"col-xs-" + cols.split(',')[1]}
          {...this.props}
          type={type}
          onBlur={validateOn === "BLUR" ? () => dispatchValidate(model, value)(dispatch) : undefined}
          />
      </ReactBootstrapField>
    )
  }
}

export default EfficientlyField;
