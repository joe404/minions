import React from 'react';
import jpg404 from './404.jpg'; //or <img src={require('./404.jpg')} ...

const Http404 = React.createClass({
  render() {
    return (
      <div>
        <h1>Wrong URL</h1>
        <img src={jpg404} alt="Wrong URL"/>
      </div>
    );
  }
});

export default Http404;
