# react-animation-mixin
A react component mixin for animating value changes.


Animation is performed via a method called setStateByAnimation. Just use this method instead of react's setState. 
The mixin first set the end state values as a state-object called 'targetValues'. 
Then, updates the state values via 'setState' methods as per React repeatedly, 
until the targetValues are reached. 

To render changes, call:

```
this.setStateByAnimation(
  statesToRender
});
```



Below is an example component animation using state changes:
```
import React from 'react';
import {AnimateByState} from './AnimationMixin.js';

var SimpleCounter = React.createClass({
mixins: [AnimateByState],
getInitialState(){
  let animationProps = {
    ease: 'quadOut',
    speed: '2000',
    delayValue: '1000'
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
    <div className='SimpleCounter'>
      <div>
        <h1>Counter 1</h1>
        <h2>{this.state.values.counter1}</h2>
      </div>
      <div>
        <h1>Counter 2</h1>
        <h2>{this.state.values.counter2}</h2>
      </div>
    </div>
  );
}

});

```

# Controlling Animation
Animation can be controlled via a state, animationProps.
Following properties are can currently be manipulated:
  ease,
  speed (in ms, defaults to 500),
  delayValue (in ms, defaults to 0)

Speed and delayValue are self-explanatory.
Ease refers to the equation for the animation, defaults to ```quadOut```. You can choose from
[mattdesl/eases](https://github.com/mattdesl/eases/blob/master/index.js)

e.g.
```
getInitialState(){
  return (
    animationProps: {
      ease: 'quintInOut',
      speed: 2000,
      delayValue: 500
    }
  );
}
```
# installing
```
npm install react-animation-mixin --save-dev
```


inspired by @javierbyte's react-number-easing.

Any suggestions/comments welcomed! 

