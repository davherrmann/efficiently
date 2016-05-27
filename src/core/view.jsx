import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Assistant, Button, Dialog, Refresher} from '../components';
import {server, anyAction} from '../actions';

function isObject(obj) {
  return {}.toString.apply(obj) === '[object Object]';
}

function isArray(obj) {
  return {}.toString.apply(obj) === '[object Array]';
}

class View extends Component {

  // TODO separate registry
  componentMapping(name) {
    return {
      "Assistant": Assistant,
      "Button": Button,
      "input": "input",
      "Input": "input",
      "Dialog": Dialog,
      "Refresher": Refresher
    }[name] || "div";
  }

  pathToStateMapping(state, path) {
    if (path.length < 1 || !state) {
      return state;
    }

    if (path.length === 1) {
      return state[path];
    }

    return this.pathToStateMapping(state[path[0]], path.slice(1));
  }

  mapProps(state, props) {
    let mappedProps = {};
    for (let key in props) {
      let value = this.pathToStateMapping(state, props[key].toString().split('.'));
      mappedProps[key] = key.startsWith("on")
        ? () => {this.props.dispatch(server(anyAction(value)))}
        : value;
    }
    return mappedProps;
  }

  render() {
    const {state} = this.props;
    if (!state.view) {
      return <div>no view yet</div>
    }
    // TODO cache the view (only do componentMapping etc. once!)
    return this.recursiveRender(state, state.view);
  }

  recursiveRender(state, view, key) {
    let {content, ...props} = view;
    let Component = this.componentMapping(view.type);
    let mappedProps = this.mapProps(state, props);

    let mappedContent = [];
    if (isArray(content)) {
      content.forEach((component, key) => mappedContent.push(this.recursiveRender(state, component, key)));
    } else {
      mappedContent = (content ? this.pathToStateMapping(state, content.split('.')) : null);
    }

    return <Component {...mappedProps} key={key}>
      {mappedContent}
    </Component>
  }
}

export default connect(state => ({state}))(View)
