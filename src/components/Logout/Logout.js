import React from 'react';
import {Link} from 'react-router';
import auth from '../../auth.js';

class Logout extends React.Component {
  componentDidMount() {
    auth.logout();
  }

  render() {
    return (
      <div>
        <h1>Bye</h1>
        <Link to="/login">login again</Link>
      </div>
    );
  }
}

export default Logout;
