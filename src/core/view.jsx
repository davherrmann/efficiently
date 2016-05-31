import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Assistant, Button, Dialog, Refresher, States, Form, FormGroup, Field, Table} from '../components';
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
      "Refresher": Refresher,
      "States": States,
      "Form": Form,
      "FormGroup": FormGroup,
      "Field": Field,
      "Table": Table
    }[name] || this.props.components[name] || "div";
  }

  derivedValue(value, derivationName) {
    const derivations = {
      "isEmpty": (str) => (!str || 0 === str.length)
    }
    const derivation = derivations[derivationName] || this.props.derivations[derivationName] || (value => value);
    return derivation(value);
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
      if (key === "type") {
        continue;
      }

      const derivationWrapper = props[key];
      const path = derivationWrapper.sourceValue.toString().split('.');
      const sourceValue = this.pathToStateMapping(state, path);
      mappedProps[key] = key.startsWith("on")
        ? () => {this.props.dispatch(server(anyAction(sourceValue)))}
        : this.derivedValue(sourceValue, derivationWrapper.name);

      // TODO do this on server side?
      // TODO allow "middleware" for component creation
      if (path.slice(-1)[0] === "value") {
        mappedProps["model"] = derivationWrapper.sourceValue;
      }
    }
    return mappedProps;
  }

  render() {
    const {state} = this.props;
    if (!state.clientSideViewMetaData) {
      return <div>no view yet</div>
    }
    // TODO cache the view (only do componentMapping etc. once!)
    return this.recursiveRender(state, state.clientSideViewMetaData);
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
