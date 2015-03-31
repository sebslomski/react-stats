'use strict';

var React = require('react');


var graphHeight = 29;
var graphWidth = 70;
var padding = 5;

var style = {
  zIndex: 999999,
  position: 'fixed',
  height: '46px',
  width: (graphWidth + 6) + 'px',
  padding: '3px',
  backgroundColor: '#000',
  color: '#00ffff',
  fontSize: '9px',
  lineHeight: '10px',
  fontFamily: 'Helvetica, Arial, sans-serif',
  fontWeight: 'bold',
  MozBoxSizing: 'border-box',
  boxSizing: 'border-box',
  pointerEvents: 'none'
};

var graphStyle = {
  position: 'absolute',
  left: '3px',
  right: '3px',
  bottom: '3px',
  height: graphHeight + 'px',
  backgroundColor: '#282844',
  MozBoxSizing: 'border-box',
  boxSizing: 'border-box'
};


var FPSStats = React.createClass({

  propTypes: {
    isActive: React.PropTypes.bool,
    top: React.PropTypes.string,
    bottom: React.PropTypes.string,
    right: React.PropTypes.string,
    left: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      isActive: true,
      top: 'auto',
      bottom: '5px',
      right: '5px',
      left: 'auto'
    };
  },

  getInitialState: function() {
    var currentTime = +new Date();

    return {
      frames: 0,
      startTime: currentTime,
      prevTime: currentTime,
      fps: []
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.fps !== nextState.fps;
  },

  componentWillMount: function() {
    style.top = this.props.top;
    style.right = this.props.right;
    style.bottom = this.props.bottom;
    style.left = this.props.left;
  },

  componentDidMount: function() {
    if (!this.props.isActive) {
      return;
    }

    var that = this;

    var onRequestAnimationFrame = function() {
      that.calcFPS();

      window.requestAnimationFrame(onRequestAnimationFrame);
    };

    window.requestAnimationFrame(onRequestAnimationFrame);
  },

  calcFPS: function() {
    var currentTime = +new Date();

    this.setState({
      frames: this.state.frames + 1
    });

    if (currentTime > this.state.prevTime + 1000) {
      var fps = Math.round(
        (this.state.frames * 1000) / (currentTime - this.state.prevTime)
      );

      fps = this.state.fps.concat(fps);
      var sliceStart = fps.length - graphWidth;

      if (sliceStart < 0) {
        sliceStart = 0;
      }

      fps = fps.slice(sliceStart, fps.length);

      this.setState({
        fps: fps,
        frames: 0,
        prevTime: currentTime
      });
    }
  },

  render: function() {
    if (!this.props.isActive) {
      return null;
    }

    var that = this;

    var maxFps = Math.max.apply(Math.max, that.state.fps);

    var graphItems = this.state.fps.map(function(fps, i) {
      var height = (graphHeight * fps) / maxFps;

      var graphItemStyle = {
        position: 'absolute',
        bottom: '0',
        right: (that.state.fps.length -1 - i) + 'px',
        height: height + 'px',
        width: '1px',
        backgroundColor: '#00ffff',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box'
      };

      return (
        React.createElement('div', {key: 'fps-' + i, style: graphItemStyle})
      );
    });

    return (
      React.createElement('div', {style: style},
        this.state.fps[this.state.fps.length - 1], ' FPS',

        React.createElement('div', {style: graphStyle},
          graphItems
        )
      )
    );
  }
});


module.exports = {
  FPSStats: FPSStats
};
