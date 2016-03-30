import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';

const FormGroup = React.createClass({
  render() {
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    )
  }
});

export default connect()(FormGroup);
