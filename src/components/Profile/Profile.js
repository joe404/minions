import React from 'react';
import auth from '../../auth';

const Profile = React.createClass({
  render() {
    return (<h1>Profile {auth.getUser()}</h1>);
  }
});

export default Profile;
