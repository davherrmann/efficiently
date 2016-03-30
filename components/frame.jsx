import {connect} from 'react-redux';

import React from 'react';
import Ewb from './ewb';
import Form from './form';

const Frame = ({ewb = {}, dispatch}) => (
  <Ewb actions={ewb.actions || []} title={ewb.title}>
    <h1>Test</h1>
    <Form>
      <y-field model={{}}/>
    </Form>
  </Ewb>
)

// avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => state)(Frame);
