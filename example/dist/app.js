'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAnimationMixin = require('react-animation-mixin');

var SimpleCounter = _react2['default'].createClass({
  displayName: 'SimpleCounter',

  mixins: [_reactAnimationMixin.AnimateByState],
  getInitialState: function getInitialState() {
    var animationProps = {
      ease: 'quadOut',
      speed: '2000',
      delayValue: '500'
    };
    return {
      counter1: 0,
      counter2: 200,
      animationProps: animationProps
    };
  },
  componentDidMount: function componentDidMount() {
    this.setStateByAnimation({
      counter1: 100,
      counter2: 100
    });
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'simpleCounter' },
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'Counter 1'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          this.state.counter1
        )
      ),
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'h1',
          null,
          'Counter 2'
        ),
        _react2['default'].createElement(
          'h2',
          null,
          this.state.counter2
        )
      )
    );
  }

});

_react2['default'].render(_react2['default'].createElement(SimpleCounter, null), document.getElementById('demo'));