import React, {Component} from 'react';
import {connect} from 'react-redux';
import Immutable from 'seamless-immutable';

// framework components
import {Ewb, Field} from '../components';
import {Button} from 'react-bootstrap';

// my components
import Form from './form';

import {ewbAction} from '../actions';

const initialClientState = {
  ewb: {
    actions: ["print"]
  }
};

class Frame extends Component {
  render() {
    const {ewb = initialClientState.ewb, dispatch} = this.props;
    return (
      <Ewb actions={ewb.actions} title={ewb.title} onSubmit={() => this._form.submit()}>
        <h1>Test</h1>
        <Form ref={(c) => this._form = c} onSubmit={data => {console.log(data)}}></Form>
      </Ewb>
    );
  }
}

// avoid state => state, use well-defined state acccess apis in subcomponents?
export default connect(state => ({
  ewb: state.ewb
}))(Frame);
