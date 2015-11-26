import React from 'react';
import {History} from 'react-router';
import auth from '../../auth.js';

const Login = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      error: false
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    const user = this.refs.user.value;
    const pass = this.refs.pass.value;

    auth.login(user, pass, (loggedIn) => {
      if (!loggedIn) return this.setState({error:true});

      const {location} = this.props;
      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname);
      } else {
        this.history.replaceState(null, '/');
      }
    });
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Welcome</h1>
        <label><input ref="user" placeholder="user id" defaultValue="joe"/></label> (hint: joe/admin)<br/>
        <label><input type="password" ref="pass" placeholder="password"/></label> (hint: 404)<br/>
        {this.state.error && (
          <p style={{color:'red'}}>Bad user id or password.</p>
        )}
        <button type="submit">Login</button>
      </form>
    );
  }
});

export default Login;
