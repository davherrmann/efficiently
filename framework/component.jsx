import React, {Component as ReactComponent} from 'react';
import {connect} from 'react-redux';

export default (jsx) => {
  return connect(state => ({state}))(class Component extends ReactComponent {
    render() {
      return jsx(this.props.state, this.props.dispatch);
    }
  });
}
