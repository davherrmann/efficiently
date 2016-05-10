import React, {Component} from 'react';
import {connect} from 'react-redux';
import {refreshAction, server} from '../actions';
import {Label} from 'react-bootstrap';

class Refresher extends Component {
  start() {
    if (!this.interval) {
      this.interval = setInterval(() => this.refresh(), this.props.delay);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  refresh() {
    this.props.dispatch(server(refreshAction()))
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch, refresh} = nextProps;
    if (refresh && !this.props.refresh) {
      this.start();
    } else if (!refresh && this.props.refresh) {
      this.stop();
    }
  }

  render() {
    return (
      <Label bsStyle={this.interval ? "warning" : "default"}>{"async"}</Label>
    );
  }
}

export default connect()(Refresher);
