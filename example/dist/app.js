'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      value1: 0,
      value2: 0,
      animationProps: animationProps
    };
  },
  componentDidMount: function componentDidMount() {
    this.setStateByAnimation({
      counter1: 100,
      counter2: 100
    });
  },
  handleClick: function handleClick(counter, e) {
    e.preventDefault();
    var value;
    counter === 'counter1' ? value = this.state.value1 : value = this.state.value2;

    this.setStateByAnimation(_defineProperty({}, counter, value));
  },

  handleChange: function handleChange(value, e) {
    this.setState(_defineProperty({}, value, e.target.value));
  },
  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'SimpleCounter', style: this.styleSheet.SimpleCounter },
      _react2['default'].createElement(
        'div',
        { style: this.styleSheet.counter },
        _react2['default'].createElement(
          'h1',
          null,
          'Counter 1'
        ),
        _react2['default'].createElement(
          'h2',
          { style: this.styleSheet.number },
          this.state.counter1
        ),
        _react2['default'].createElement(
          'form',
          { onSubmit: this.handleClick.bind(this, 'counter1'), style: this.styleSheet.form },
          _react2['default'].createElement('input', { type: 'number', value: this.state.value1, onChange: this.handleChange.bind(this, 'value1'), style: this.styleSheet.input }),
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'button',
              { type: 'submit', style: this.styleSheet.button },
              'update'
            )
          )
        ),
        _react2['default'].createElement('div', { className: 'bar',
          style: Object.assign({}, this.styleSheet.bar1, { width: this.state.counter1 }) })
      ),
      _react2['default'].createElement(
        'div',
        { style: this.styleSheet.counter },
        _react2['default'].createElement(
          'h1',
          null,
          'Counter 2'
        ),
        _react2['default'].createElement(
          'h2',
          { style: this.styleSheet.number },
          this.state.counter2
        ),
        _react2['default'].createElement(
          'form',
          { onSubmit: this.handleClick.bind(this, 'counter2'), style: this.styleSheet.form },
          _react2['default'].createElement('input', { type: 'number', value: this.state.value2, onChange: this.handleChange.bind(this, 'value2'), style: this.styleSheet.input }),
          _react2['default'].createElement(
            'div',
            null,
            _react2['default'].createElement(
              'button',
              { type: 'submit', style: this.styleSheet.button },
              'update'
            )
          )
        ),
        _react2['default'].createElement('div', { className: 'bar',
          style: Object.assign({}, this.styleSheet.bar2, { width: this.state.counter2 }) })
      )
    );
  },
  styleSheet: {
    SimpleCounter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    counter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    number: {
      backgroundColor: 'lightBlue',
      padding: '10px',
      borderRadius: '5px'
    },
    input: {
      fontSize: '20px'
    },
    bar1: {
      position: 'absolute',
      bottom: '0',
      left: '30%',
      height: '30px',
      backgroundColor: 'blue'
    },
    bar2: {
      position: 'absolute',
      bottom: '0',
      left: '30%',
      height: '30px',
      backgroundColor: 'black'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '50px'
    },
    button: {
      marginTop: '10px',
      fontSize: '25px',
      backgroundColor: '#6DB96D',
      cursor: 'pointer'
    }
  }

});

_react2['default'].render(_react2['default'].createElement(SimpleCounter, null), document.getElementById('demo'));

//<button onClick={this.handleClick(this, 'counter1')}>update</button>