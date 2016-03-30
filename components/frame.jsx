import {connect} from 'react-redux';

import React from 'react';
import Ewb from './ewb';
import Form from './form';
import Field from './field';

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
