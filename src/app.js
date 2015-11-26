import React from 'react';
import {render} from 'react-dom';
import {Router,Route,IndexRoute,Link,History} from 'react-router';
import {createHashHistory,useBasename} from 'history';
import auth from './auth';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Dashboard from './components/Dashboard/Dashboard';
import Apis from './components/Apis/Apis';
import Apps from './components/Apps/Apps';
import Developers from './components/Developers/Developers';
import Help from './components/Help/Help';
import Admin from './components/Admin/Admin';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Http403 from './components/Http403/Http403';

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
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
});

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  }
}

function requireAdmin(nextState, replaceState) {
  if (!auth.loggedIn()) {
    replaceState({nextPathname: nextState.location.pathname}, '/login');
  } else if (!auth.canAdmin()) {
    replaceState({nextPathname: nextState.location.pathname}, '/403');
  }
}

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} onEnter={requireAuth}/>
      <Route path="apis" component={Apis} onEnter={requireAuth}/>
      <Route path="apps" component={Apps} onEnter={requireAuth}/>
      <Route path="developers" component={Developers} onEnter={requireAuth}/>
      <Route path="help" component={Help}/>
      <Route path="admin" component={Admin} onEnter={requireAdmin}/>
      <Route path="profile" component={Profile} onEnter={requireAuth}/>
      <Route path="login" component={Login}/>
      <Route path="logout" component={Logout}/>
      <Route path="403" component={Http403}/>
    </Route>
  </Router>
), document.getElementById('app'));
