# React-Stats

## React Performance Monitor

Inspired by https://github.com/mrdoob/stats.js

### Screenshots

![FPS](http://i.imgur.com/nqcXluS.png)

### Usage

```javascript
'use strict';

var React = require('react');
var FPSStats = require('react-stats.jsx').FPSStats;

var Application = React.createClass({
  render: function() {
    return (
        <div>
          <FPSStats />
        </div>
    );
  }
});

React.render(
  React.createElement(Application, null),
  document.body
);
```
