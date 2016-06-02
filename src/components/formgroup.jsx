import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-bootstrap';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const FormGroup = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    )
  }
});

export default connect()(FormGroup);
