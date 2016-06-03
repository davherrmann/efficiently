import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Assistant, Button, Dialog, Refresher, States, FormGroup, Form, Field, Table} from '../components';
import {server, anyAction} from '../actions';
import { getField } from 'react-redux-form';

function isObject(obj) {
  return {}.toString.apply(obj) === '[object Object]';
}

function isArray(obj) {
  return {}.toString.apply(obj) === '[object Array]';
}

class View extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.ready != undefined
      && nextProps.clientSideViewMetaData != undefined
      && (this.props.clientSideViewMetaData != nextProps.clientSideViewMetaData || this.props.ready != nextProps.ready);
  }

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

      mappedProps["dispatch"] = this.props.dispatch;

      // TODO do this on server side?
      // TODO allow "middleware" for component creation
      if (path.slice(-1)[0] === "value") {
        const source = derivationWrapper.sourceValue;
        const model = source.substr(0, source.length - ".value".length);
        const field = model && getField(state.clientSideFormMetaData, model.split('.').slice(0, 2).join('.')) || {};
        mappedProps["model"] = model;
        mappedProps["field"] = field;
      }
    }
    return mappedProps;
  }

  render() {
    const {store, clientSideViewMetaData} = this.props;
    if (!clientSideViewMetaData) {
      return <div>no view yet</div>
    }

    console.log("rendering view")
    console.log(clientSideViewMetaData)

    // TODO cache the view (only do componentMapping etc. once!)
    return this.recursiveRender(store, clientSideViewMetaData);
  }

  recursiveRender(store, view, key) {
    let {content, ...props} = view;
    let mapToProps = (s) => {
      const mappedProps = this.mapProps(s, props);
      return mappedProps;
    }

    let Component = connect(mapToProps)(this.componentMapping(view.type));
    // let mappedProps = this.mapProps(state, props);

    let mappedContent = [];
    if (isArray(content)) {
      content.forEach((component, key) => mappedContent.push(this.recursiveRender(store, component, key)));
    } else {
      mappedContent = (content ? this.pathToStateMapping(store.getState(), content.split('.')) : null);
    }

    return <Component key={key}>
      {mappedContent}
    </Component>
  }
}

export default connect(state => ({
  ready: state.ready,
  clientSideViewMetaData: state.clientSideViewMetaData
}))(View)
