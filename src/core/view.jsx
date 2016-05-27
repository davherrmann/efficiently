import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Assistant, Button, Dialog} from '../components';
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
      "Dialog": Dialog
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
    return this.recursiveRender(state, state.view);
  }

  recursiveRender(state, view, key) {
    let Component = this.componentMapping(view.type);
    let mappedProps = this.mapProps(state, view);

    let content = [];
    if (isArray(view.content)) {
      view.content.forEach((component, key) => content.push(this.recursiveRender(state, component, key)));
    } else {
      content = (view.content ? this.pathToStateMapping(state, view.content.split('.')) : null);
    }

    return <Component {...mappedProps} key={key}>
      {content}
    </Component>
  }
}

export default connect(state => ({state}))(View)
