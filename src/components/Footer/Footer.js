import React from 'react';
import footercss from './docs.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="bs-docs-footer">
        <div className="container">
          <p>2015</p>
          <ul className="bs-docs-footer-links muted">
            <li><a href="https://github.com/joe404/minions/">GitHub</a></li>
            <li>·</li>
            <li><a href="https://github.com/joe404/minions/issues?state=open">Issues</a></li>
            <li>·</li>
            <li><a href="https://github.com/joe404/minions/releases">Releases</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
