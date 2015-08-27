# react-animation-mixin
A react component mixin for animating value changes. 
2 ways to include the mixin: via state or via props

via state:
animation is done via state changes of (object) 'displayValues'.
Add whatever values you want as a property of displayValues.
The mixin utilises another state, values, as intermediate values during the animation rendering.
Use the corresponding properties in 'values' in lieu of those displayValues.
The properties in values and displayValues should have the same property.

To render changes, call:

```this.setStateByAnimation(
  statesToRender
, this.startAnimation); ```



Below is an example component animation using state changes:
```
import React from 'react';
import {AnimateByState} from './AnimationMixin.js';

var simpleCounter = React.createClass({
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
  values: values,

  animationProps: animationProps
  });
},
componentDidMount(){
  this.setStateByAnimation(
  counter1: 100,
  counter2: 100
  );
},

render(){
  return(
    <div>
      <div>
        <h1>Counter 1</h1>
        <h2>{this.state.values.counter1}</h2>
      </div>
      <div>
        <h1>Counter 2</h2>
        <h2>{this.state.values.counter2}</h2>
      <div>
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
```getInitialState(){
  return (
    animationProps: {
      ease: 'quintInOut',
      speed: 2000,
      delayValue: 500
    }
  );
}
```

