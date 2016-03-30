import React from 'react';
import {connect} from 'react-redux';
import {ewbAction} from '../actions';
import {Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid} from 'react-bootstrap';

const Ewb = ({dispatch, children, actions, title}) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          {title}
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullRight>
          {actions.map((action, index) => (
            <Button key={index} onClick={() => dispatch(ewbAction(action))} bsStyle="primary">{action}</Button>
          ))}
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
    <Grid>
      {children}
    </Grid>
  </div>
);

export default connect()(Ewb);
