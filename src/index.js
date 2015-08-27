import eases from 'eases';

let AnimateByState = {

  startAnimation() {
    if(!isNaN(parseInt(this.state.delayValue, 10))) {
      setTimeout( ()=> {
        this.startAnimationTime = (new Date()).getTime();
        this.updateNumbers();
      }, this.state.delayValue);
    }else {
      this.startAnimationTime = (new Date()).getTime();
      this.updateNumbers();
    }
  },

  updateNumbers() {

    let targetValues = this.state.displayValues;
    var now = (new Date()).getTime();
    var elapsedTime = (now - this.startAnimationTime);
    var progress = eases[this.state.ease](elapsedTime / this.state.speed);
    let newValues = [];
    for(let value in targetValues) {
      if(targetValues.hasOwnProperty(value)) {
        newValues[value] = Math.round((targetValues[value] * progress));
      }
    }
    this.setState({
      values: newValues
    });
    if (elapsedTime < this.state.speed) {
      this.timeout = setTimeout(this.updateNumbers, 16); // 16ms === 60 frames/sec
    } else {
      this.setState({
        values: targetValues
      });
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.delayTimeout);
  }

};

let AnimationMixin = {
  AnimateByState: AnimateByState
};

export default AnimationMixin;
