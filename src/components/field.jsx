import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';

const Field = React.createClass({
  render() {
    return (
      <Input standalone {...this.props} hasFeedback/>
    )
  }
});

export default connect()(Field);
