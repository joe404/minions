import React from 'react';
import {History} from 'react-router';
import auth from '../../auth.js';

import {TextField, RaisedButton, Snackbar} from 'material-ui';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';

//TODO: React Mixins Are Dead in ES6 http://segmentfault.com/a/1190000002884524
const Login = React.createClass({
  mixins: [History],

  getInitialState() {
    return {
      error: false
    };
  },

  handleSubmit(event) {
    event.preventDefault();

    const user = this.refs.user.getValue();
    const pass = this.refs.pass.getValue();

    auth.login(user, pass, (loggedIn) => {
      if (!loggedIn) {
        //return this.setState({error:true});
        this.setState({error:true});
        this.refs.snackbar.show();
        return;
      }

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
      <Grid>
        <Row>
          <Col className="text-center">
            <h1>Welcome</h1>

      <form onSubmit={this.handleSubmit}>
        <TextField ref="user" hintText="joe or admin" floatingLabelText="User ID"/><br/>
        <TextField ref="pass" hintText="404" floatingLabelText="Password" type="password"/><br/>
        {this.state.error && (
          <Snackbar
            ref="snackbar"
            message="Bad user id or password."
            bodyStyle={{backgroundColor:'grey'}}
          />
        )}
        <br/><br/>
        <RaisedButton label="Login" type="submit"/>
      </form>

          </Col>
        </Row>
      </Grid>
    );
  }
});

export default Login;
