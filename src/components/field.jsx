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

class EfficientlyField extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // return Object.keys(new Differ().diff(this.props, nextProps)).length > 0;
    return this.props != nextProps;
  }

  render() {
    let {field, model, cols = "2,4", type = "text", validators = [], validateOn, dispatch, valid, error} = this.props;

    let helpText = field.touched && error ? helpText + " " + error : helpText;

    this.changeAction = this.changeAction || (validateOn && validateOn.toLowerCase() === "change"
      ? (extendedModel, value) => (dispatch) => {
          dispatch(actions.change("clientSideFormData." + model + ".value", value));
          dispatch(server(validate(model)));
        }
      : (extendedModel, value) => (dispatch) => {
          dispatch(actions.change("clientSideFormData." + model + ".value", value));
        });

    this.onBlurAction = this.onBlurAction || (validateOn && validateOn.toLowerCase() === "blur"
      ? () => dispatch(server(validate(model)))
      : undefined);

    // TODO use validateOn, don't always send server(validate(...)) on change!
    return (
      <ReactBootstrapField
        model={"clientSideFormMetaData." + model}
        changeAction={this.changeAction}
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
          onBlur={this.onBlurAction}
          />
      </ReactBootstrapField>
    )
  }
}

export default EfficientlyField;
