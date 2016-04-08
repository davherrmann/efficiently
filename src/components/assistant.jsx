import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ewbAction, server, assistantAction} from '../actions';
import {Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid} from 'react-bootstrap';
import Immutable from 'seamless-immutable';

class Ewb extends Component {
  render() {
    const {dispatch, children, actions, title, onSubmit, currentPage = 0} = this.props;

    // TODO use React.cloneElement and set prop hidden for better performance!
    let filteredChildren = React.Children.toArray(children).filter((child, index) => index === currentPage);

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
                <Button key={index} onClick={() => dispatch(server(assistantAction(action)))} bsStyle="primary">{action}</Button>
              ))}
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          {filteredChildren}
        </Grid>
        <Navbar>
          <Navbar.Collapse>
            <Navbar.Form pullRight>
              <Button disabled={currentPage <= 0} onClick={() => dispatch(server(assistantAction('previous')))} bsStyle="primary">Previous</Button>
              <Button disabled={currentPage >= React.Children.count(children) - 1} onClick={() => dispatch(server(assistantAction('next')))} bsStyle="primary">Next</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect()(Ewb);
