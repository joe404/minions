import React from 'react';
import {render} from 'react-dom';
import {Router,Route,Link,History} from 'react-router';
import {createHashHistory,useBasename} from 'history';
import auth from './auth';

const history = useBasename(createHashHistory)({
  basename: '/',
  queryKey: false
});

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth;
    auth.login();
  },

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken();

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You get token {token}.</p>
      </div>
    );
  }
});

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
        <label><input ref="user" placeholder="user" defaultValue="joe"/></label><br/>
        <label><input ref="pass" placeholder="password"/></label> (404)<br/>
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad user id or password</p>
        )}
      </form>
    );
  }
});

const About = React.createClass({
  render() {
    return (<h1>About</h1>);
  }
});

const Logout = React.createClass({
  componentDidMount() {
    auth.logout();
  },

  render() {
    return (<p>You are now logged out</p>);
  }
});

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route path="logout" component={Logout}/>
      <Route path="about" component={About}/>
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
    </Route>
  </Router>
), document.getElementById('app'));
