import React from 'react';
import {connect} from 'react-redux';

const Field = React.createClass({
  render() {
    return (
      <form {...this.props} className="form-horizontal">
        {this.props.children}
      </form>
    )
  }
});

export default connect()(Field);
