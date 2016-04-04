import React, {createElement} from 'react';
import {connect} from 'react-redux';

const Loader = ({state, contentComponent}) => {
  if (state.ready) {
    return createElement(contentComponent);
  } else {
    return <div className="loading">Loaaaaaddding...</div>
  }
}

// TODO avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({state}))(Loader)
