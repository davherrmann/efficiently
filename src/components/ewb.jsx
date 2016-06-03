import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ewbAction, server} from '../actions';
import {Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid} from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Ewb extends Component {
  constructor() {
    super();
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {dispatch, children, actions, title, onSubmit} = this.props;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              {title}
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              {Immutable(actions).asMutable().map((action, index) => (
                <Button key={index} onClick={() => dispatch(server(ewbAction(action)))} bsStyle="primary">{action}</Button>
              ))}
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          {children}
        </Grid>
        <Navbar>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <Button onClick={() => onSubmit()} bsStyle="primary">Submit</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Ewb;
