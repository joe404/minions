import React from 'react';
import {Link} from 'react-router';
import auth from '../../auth';

/*
import {AppBar, IconButton, IconMenu} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Icons from 'material-ui/lib/svg-icons';
import MenuItem from 'material-ui/lib/menus/menu-item';

const Header = React.createClass({
  render() {
    return (
      <div>
        <AppBar
          iconElementLeft={
            <IconButton linkButton={true} containerElement={<Link to="/"/>}>
              <Icons.AvMovie color={Colors.yellow500}/>
            </IconButton>
          } 
          title="Minions"
          iconElementRight={
            <IconMenu iconButtonElement={
              <IconButton disabled={!auth.loggedIn()}><Icons.AvGames/></IconButton>
            }>
              <MenuItem primaryText="Profile" containerElement={<Link to="/profile"/>}/>
              <MenuItem primaryText="Logout" containerElement={<Link to="/logout"/>}/>
            </IconMenu>
          }
        />
      </div>
    );
  }
});
*/

//material-ui appbar is not bootstrap navbar.
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
const Header = React.createClass({
  render() {
    return (
      <Navbar inverse staticTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" style={{color:'yellow'}}>MINI<Glyphicon glyph="eye-open"/>NS</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="#/apis">APIs</NavItem>
            <NavItem href="#/apps">Apps</NavItem>
            <NavItem href="#/developers">Developers</NavItem>
          </Nav>
          <Nav pullRight>
            {auth.canAdmin() ? (
              <NavItem href="#/admin">Admin</NavItem>
            ) : ''}
            <NavItem href="#/help">Help</NavItem>
            {auth.loggedIn() ? (
              <NavDropdown title={auth.getUser()} id="nav-dropdown">
                <MenuItem href="#/profile">Profile</MenuItem>
                <MenuItem href="#/logout">Logout</MenuItem>
              </NavDropdown>
            ) : (
              <NavItem href="#/login">Login</NavItem>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
});


export default Header;
