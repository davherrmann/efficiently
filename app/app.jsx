import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// framework components
import Ewb from '../components/ewb';
import Field from '../components/field';

// my components
import Form from './form';

import {ewbAction} from '../actions';

const initialClientState = {
  ewb: {
    actions: ["print"]
  }
};

const Frame = ({ewb = initialClientState.ewb, dispatch}) => (
  <Ewb actions={ewb.actions} title={ewb.title}>
    <h1>Test</h1>
    <Form onSubmit={data => {console.log(data)}}></Form>
  </Ewb>
)

// avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({
  ewb: state.ewb
}))(Frame);
