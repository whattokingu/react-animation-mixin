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
      value1: 0,
      value2: 0,
      animationProps: animationProps
    });
  },
  componentDidMount(){
    this.setStateByAnimation({
      counter1: 100,
      counter2: 100
    });
  },
  handleClick(counter, e){
    e.preventDefault();
    var value;
    counter === 'counter1' ? value = this.state.value1 : value = this.state.value2;

    this.setStateByAnimation({
      [counter]: value
    });
  },

  handleChange(value, e){
    this.setState({
      [value] : e.target.value
    });
  },
  render(){
    return(
        <div className='SimpleCounter' style={this.styleSheet.SimpleCounter}>
          <div style={this.styleSheet.counter}>
            <h1>Counter 1</h1>
            <h2 style={this.styleSheet.number}>{this.state.counter1}</h2>
            <form onSubmit={this.handleClick.bind(this, 'counter1')} style={this.styleSheet.form}>
              <input type='number' value={this.state.value1} onChange={this.handleChange.bind(this,'value1')} style={this.styleSheet.input}/>
              <div>
                <button type='submit' style={this.styleSheet.button}>update</button>
              </div>
            </form>

          </div>
          <div style={this.styleSheet.counter}>
            <h1>Counter 2</h1>
            <h2 style={this.styleSheet.number}>{this.state.counter2}</h2>
            <form onSubmit={this.handleClick.bind(this, 'counter2')} style={this.styleSheet.form}>
              <input type='number' value={this.state.value2} onChange={this.handleChange.bind(this,'value2')} style={this.styleSheet.input}/>
              <div>
                <button type='submit' style={this.styleSheet.button}>update</button>
              </div>
            </form>
          </div>
        </div>
    );
  },
  styleSheet: {
    SimpleCounter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    counter: {
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    number: {
      backgroundColor: 'lightBlue',
      padding: '10px',
      borderRadius: '5px'
    },
    input: {
      fontSize: '20px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button:{
      marginTop: '10px',
      fontSize: '25px',
      backgroundColor: '#6DB96D',
      cursor: 'pointer'
    }
  }

});

React.render(<SimpleCounter/>, document.getElementById('demo'));

//<button onClick={this.handleClick(this, 'counter1')}>update</button>