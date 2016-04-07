import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';

const Field = React.createClass({
  render() {
    return (
      <Input
        standalone
        hasFeedback
        bsStyle={this.props.model.touched && this.props.model.error ? "error" : null}
        help={this.props.model.touched && this.props.model.error}
        labelClassName={"col-xs-" + this.props.cols.split(',')[0]}
        wrapperClassName={"col-xs-" + this.props.cols.split(',')[1]}
        {...this.props}
        {...this.props.model}
        />
    )
  }
});

export default connect()(Field);
