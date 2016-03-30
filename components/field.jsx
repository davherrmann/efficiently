import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';

const Field = React.createClass({
  getInitialState() {
    return {value: ''};
  },

  handleChange() {
    this.setState({
      value: this.refs.input.getValue()
    });
    this.props.onChange && this.props.onChange(arguments);
  },

  render() {
    return (
      <Input type="text" value={this.state.value} onChange={this.handleChange} ref="input"></Input>
    )
  }
});

export default connect()(Field);
