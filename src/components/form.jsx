import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const Field = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <form {...this.props} className="form-horizontal">
        {this.props.children}
      </form>
    )
  }
});

export default connect()(Field);
