import eases from 'eases';

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

export default AnimationMixin;

