//ref: https://github.com/rackt/react-router/blob/master/examples/auth-flow/auth.js

module.exports = {
  login(user, pass, cb) {
    cb = arguments[arguments.length - 1]; //?
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    pretendRequest(user, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        localStorage.user = user;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    })
  },

  getToken() {
    return localStorage.token;
  },

  getUser() {
    return localStorage.user;
  },

  logout(cb) {
    delete localStorage.token;
    delete localStorage.user;
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  canAdmin() {
    return (localStorage.user === 'admin');
  },

  onChange() {}
}

function pretendRequest(user, pass, cb) {
  setTimeout(() => {
    if ((user === 'joe' || user === 'admin') && pass === '404') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({authenticated: false});
    }
  }, 0);
}
