var eases =require('eases');

var AnimationByState = {
  setStateByAnimation: function(states){
    var currentTargetValues = this.state.targetValues;

    this.setState({
          prevValues: Object.assign({}, this.state.prevValues, currentTargetValues),
          targetValues: Object.assign({}, this.state.targetValues, states)
        }, this.startAnimation);
  },
  startAnimation: function() {
    var delayValue = this.state.animationProps ? this.state.animationProps.delayValue : undefined;
    if(!isNaN(parseInt(delayValue, 10))) {
      setTimeout( function() {
        this.startAnimationTime = (new Date()).getTime();
        this.updateNumbers();
      }, delayValue);
    }else {
      this.startAnimationTime = (new Date()).getTime();
      this.updateNumbers();
    }
  },

  updateNumbers: function() {
    var ease = this.state.animationProps ? this.state.animationProps.ease || 'quadOut' : 'quadOut';
    var speed = this.state.animationProps ? this.state.animationProps.speed || 500 : 500;

    var targetValues = this.state.targetValues;
    var now = (new Date()).getTime();
    var elapsedTime = (now - this.startAnimationTime);
    var progress = eases[ease](elapsedTime / speed);
    var newValues = [];
    for(var value in targetValues) {
      if(targetValues.hasOwnProperty(value)) {
        var prevVal = this.state.prevValues[value] ? this.state.prevValues[value] : 0;
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

  componentWillUnmount: function() {
    clearTimeout(this.timeout);
    clearTimeout(this.delayTimeout);
  }

};

var AnimationMixin = {
  AnimateByState: AnimationByState
};

module.exports.AnimationMixin = AnimationMixin;

