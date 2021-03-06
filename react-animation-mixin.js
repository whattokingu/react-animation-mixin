'use strict';
//Polyfill Object.assign method
if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function value(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

var eases = require('eases');

var AnimationByState = {
  setStateByAnimation: function setStateByAnimation(states) {
    var _this = this;
    var currentTargetValues = {};

    var delayValue = this.state.animationProps ? this.state.animationProps.delayValue : undefined;

    for (var state in states) {
      currentTargetValues[state] = this.state[state];
      if (isNaN(states[state])) {
        states[state] = 0;
      }
    }
    if (!isNaN(parseInt(delayValue, 10))) {
      setTimeout(function () {
        _this.clearTimeout(_this.timeout);
        _this.setState({
          prevValues: currentTargetValues,
          targetValues: states
        }, _this.startAnimation);
      }, delayValue);
    }else{
      _this.clearTimeout(_this.timeout);
      _this.setState({
        prevValues: currentTargetValues,
        targetValues: states
      }, _this.startAnimation);
    }
  },
  startAnimation: function startAnimation() {
    var _this = this;
    _this.startAnimationTime = new Date().getTime();
    _this.updateNumbers();
  },

  updateNumbers: function updateNumbers() {
    var ease = this.state.animationProps ? this.state.animationProps.ease || 'quadOut' : 'quadOut';
    var speed = this.state.animationProps ? this.state.animationProps.speed || 500 : 500;

    var targetValues = this.state.targetValues;
    var now = new Date().getTime();
    var elapsedTime = now - this.startAnimationTime;
    var progress = eases[ease](elapsedTime / speed);
    var newValues = [];
    for (var value in targetValues) {
      if (targetValues.hasOwnProperty(value)) {
        var prevVal = this.state.prevValues[value] ? this.state.prevValues[value] : 0;
        var difference = Math.round((targetValues[value] - prevVal) * progress);
        newValues[value] = difference + parseInt(prevVal);
      }
    }
    this.setState(newValues);
    if (elapsedTime < speed) {
      this.timeout = setTimeout(this.updateNumbers, 16); // 16ms === 60 frames/sec
    } else {
      this.setState(targetValues);
    }
  },

  clearTimeout: function(timeout){
    this.setState(this.state.targetValues);
    clearTimeout(timeout);
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.delayTimeout);
  }

};

var AnimationMixin = {
  AnimateByState: AnimationByState
};

module.exports = AnimationMixin;