import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';

const Field = React.createClass({
  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input {...this.props}/>
      </div>
    )
  }
});

export default connect()(Field);
