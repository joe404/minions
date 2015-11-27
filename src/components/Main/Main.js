import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Dashboard from '../Dashboard/Dashboard';

const Main = React.createClass({
  render() {
    return (
      <div>
        <Header/>
        <div style={{padding:20}}>
          {this.props.children || <Dashboard/>}
        </div>
        <Footer/>
      </div>
    );
  }
});

export default Main;
