import React from 'react';
import {connect} from 'react-redux';

// components
import App from '../app/app';

const Loader = ({state}) => {
  if (state.ready) {
    return <App></App>
  } else {
    return <div className="loading">Loaaaaaddding...</div>
  }
}

// TODO avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({state}))(Loader)
