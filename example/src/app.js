import React from 'react';
import {AnimateByState} from 'react-animation-mixin';

var SimpleCounter = React.createClass({
  mixins: [AnimateByState],
  getInitialState(){
    let animationProps = {
      ease: 'quadOut',
      speed: '2000',
      delayValue: '500'
    };
    return ({
      counter1: 0,
      counter2: 200,
      animationProps: animationProps
    });
  },
  componentDidMount(){
    this.setStateByAnimation({
      counter1: 100,
      counter2: 100
    });
  },

  render(){
    return(
        <div className='simpleCounter'>
          <div>
            <h1>Counter 1</h1>
            <h2>{this.state.counter1}</h2>
          </div>
          <div>
            <h1>Counter 2</h1>
            <h2>{this.state.counter2}</h2>
          </div>
        </div>
    );
  }

});

React.render(<SimpleCounter/>, document.getElementById('demo'));