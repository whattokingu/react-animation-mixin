'use strict';


if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
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

let AnimationByState = {
  setStateByAnimation(states) {
    let currentTargetValues = this.state.targetValues;

    this.setState({
      prevValues: Object.assign({}, this.state.prevValues, currentTargetValues),
      targetValues: Object.assign({}, this.state.targetValues, states)
    }, this.startAnimation);
  },
  startAnimation() {
    let delayValue = this.state.animationProps ? this.state.animationProps.delayValue : undefined;
    if(!isNaN(parseInt(delayValue, 10))) {
      setTimeout( ()=> {
        this.startAnimationTime = (new Date()).getTime();
        this.updateNumbers();
      }, delayValue);
    }else {
      this.startAnimationTime = (new Date()).getTime();
      this.updateNumbers();
    }
  },

  updateNumbers() {
    let ease = this.state.animationProps ? this.state.animationProps.ease || 'quadOut' : 'quadOut';
    let speed = this.state.animationProps ? this.state.animationProps.speed || 500 : 500;

    let targetValues = this.state.targetValues;
    var now = (new Date()).getTime();
    var elapsedTime = (now - this.startAnimationTime);
    var progress = eases[ease](elapsedTime / speed);
    let newValues = [];
    for(let value in targetValues) {
      if(targetValues.hasOwnProperty(value)) {
        let prevVal = this.state.prevValues[value] ? this.state.prevValues[value] : 0;
        newValues[value] = Math.round((targetValues[value] - prevVal) * progress + prevVal);
      }
    }
    this.setState(
        newValues
    );
    if (elapsedTime < speed) {
      this.timeout = setTimeout(this.updateNumbers, 16); // 16ms === 60 frames/sec
    } else {
      this.setState(
          targetValues
      );
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.delayTimeout);
  }

};

let AnimationMixin = {
  AnimateByState: AnimationByState
};





module.exports = AnimationMixin;