import React, {Component} from 'react';

class EfficientlyFormGroup extends Component {
  //mixins: [PureRenderMixin],
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldFormGroupUpdate");
    return this.props != nextProps;
  }

  render() {
    console.log("renderFormGroup")
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    )
  }
}

export default EfficientlyFormGroup;
