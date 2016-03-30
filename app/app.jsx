import React from 'react';
import {connect} from 'react-redux';

// framework components
import Ewb from '../components/ewb';
import Field from '../components/field';

// my components
import Form from './form';

import {ewbAction} from '../actions';

const Frame = ({ewb = {}, dispatch}) => (
  <Ewb actions={ewb.actions || []} title={ewb.title}>
    <h1>Test</h1>
    <Form></Form>
  </Ewb>
)

// avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({
  ewb: state.ewb
}))(Frame);
