'use strict';

var React = require('react');

var FPSStats = require('../index.js').FPSStats;


var Expensive = React.createClass({

  getInitialState: function() {
    return {
      date: new Date()
    };
  },

  componentDidMount: function() {
    var that = this;

    window.setInterval(function() {
      that.setState({
          date: new Date()
      });
    }, 1);
  },

  render: function() {
    var style = {
      position: 'absolute',
      top: Math.floor((Math.random() * 100) + 1) + '%',
      left: Math.floor((Math.random() * 100) + 1) + '%',
      width: '20px',
      height: '20px',
      backgroundColor: 'rgb('+ Math.floor((Math.random() * 255) + 1) + ','+ Math.floor((Math.random() * 255) + 1) +', '+ Math.floor((Math.random() * 255) + 1) +')'
    };

    return (
      <div style={style}></div>
    );
  }
});


var Application = React.createClass({
  render: function() {
    var items = [
      1,1,1
    ].map(function(i) {
        return (<Expensive key={Math.random()} />);
    });

    return (
        <div>
          <FPSStats />
          {items}
        </div>
    );
  }
});


React.render(
  React.createElement(Application, null),
  document.getElementById('container')
);
