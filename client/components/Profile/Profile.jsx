import React from 'react';
import auth from '../../auth';

class Profile extends React.Component {
  render() {
    return (<h1>Profile {auth.getUser()}</h1>);
  }
}

export default Profile;
