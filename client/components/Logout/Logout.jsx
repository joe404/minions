import React from 'react';
import {Link} from 'react-router';
import auth from '../../auth.js';

class Logout extends React.Component {
  componentDidMount() {
    auth.logout();
  }

  componentWillUpdate() {
    this.props.history.replace('/login');
  }

  render() {
    return null;
  }
}

export default Logout;
