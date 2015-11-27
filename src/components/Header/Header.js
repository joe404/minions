import React from 'react';
import {Link} from 'react-router';
import auth from '../../auth';

const Header = React.createClass({

  render() {
    return (
      <div>
        <Link to="/">Home</Link>{' '}
        <Link to="/apis">APIs</Link>{' '}
        <Link to="/apps">Apps</Link>{' '}
        <Link to="/developers">Developers</Link>{' '}
        |{' '}
        <Link to="/help">Help</Link>{' '}
        {auth.canAdmin() ? (
          <span>
            <Link to="/admin">Admin</Link>{' '}
          </span>
        ) : ''}
        <Link to="/profile">{auth.getUser()?'['+auth.getUser()+']':'Profile'}</Link>{' '}
        |{' '}
        {auth.loggedIn() ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    );
  }
});

export default Header;
