import React from 'react';
import {connect} from 'react-redux';

const AssistantPage = React.createClass({
  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
});

export default connect()(AssistantPage);
