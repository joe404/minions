import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Dashboard from '../Dashboard/Dashboard';

class Main extends React.Component {
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
}

export default Main;
