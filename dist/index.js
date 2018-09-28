"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var graphHeight = 29;
var graphWidth = 70;
var padding = 5;

var style = {
  zIndex: 999999,
  position: "fixed",
  height: "46px",
  width: graphWidth + 6 + "px",
  padding: "3px",
  backgroundColor: "#000",
  color: "#00ffff",
  fontSize: "9px",
  lineHeight: "10px",
  fontFamily: "Helvetica, Arial, sans-serif",
  fontWeight: "bold",
  MozBoxSizing: "border-box",
  boxSizing: "border-box",
  pointerEvents: "none"
};

var graphStyle = {
  position: "absolute",
  left: "3px",
  right: "3px",
  bottom: "3px",
  height: graphHeight + "px",
  backgroundColor: "#282844",
  MozBoxSizing: "border-box",
  boxSizing: "border-box"
};

var FPSStats = function (_Component) {
  _inherits(FPSStats, _Component);

  function FPSStats(props) {
    _classCallCheck(this, FPSStats);

    var _this = _possibleConstructorReturn(this, (FPSStats.__proto__ || Object.getPrototypeOf(FPSStats)).call(this, props));

    var currentTime = +new Date();
    _this.state = {
      frames: 0,
      startTime: currentTime,
      prevTime: currentTime,
      fps: []
    };
    return _this;
  }

  _createClass(FPSStats, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.fps !== nextState.fps;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      style.top = this.props.top;
      style.right = this.props.right;
      style.bottom = this.props.bottom;
      style.left = this.props.left;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.isActive) {
        return;
      }

      var that = this;

      var onRequestAnimationFrame = function onRequestAnimationFrame() {
        that.calcFPS();

        window.requestAnimationFrame(onRequestAnimationFrame);
      };

      window.requestAnimationFrame(onRequestAnimationFrame);
    }
  }, {
    key: "calcFPS",
    value: function calcFPS() {
      var currentTime = +new Date();

      this.setState({
        frames: this.state.frames + 1
      });

      if (currentTime > this.state.prevTime + 1000) {
        var fps = Math.round(this.state.frames * 1000 / (currentTime - this.state.prevTime));

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
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.isActive) {
        return null;
      }

      var that = this;

      var maxFps = Math.max.apply(Math.max, that.state.fps);

      var graphItems = this.state.fps.map(function (fps, i) {
        var height = graphHeight * fps / maxFps;

        var graphItemStyle = {
          position: "absolute",
          bottom: "0",
          right: that.state.fps.length - 1 - i + "px",
          height: height + "px",
          width: "1px",
          backgroundColor: "#00ffff",
          MozBoxSizing: "border-box",
          boxSizing: "border-box"
        };

        return _react2.default.createElement("div", {
          key: "fps-" + i,
          style: graphItemStyle
        });
      });

      return _react2.default.createElement("div", { style: style }, this.state.fps[this.state.fps.length - 1], " FPS", _react2.default.createElement("div", { style: graphStyle }, graphItems));
    }
  }]);

  return FPSStats;
}(_react.Component);

FPSStats.defaultProp = {
  isActive: true,
  top: "auto",
  bottom: "5px",
  right: "5px",
  left: "auto"
};

exports.default = FPSStats;