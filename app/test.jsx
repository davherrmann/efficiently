import React from 'react';
import component from '../framework/component';

export default component((state, dispatch) => {
  return <div className="test">{state.ewb.title}</div>
})
