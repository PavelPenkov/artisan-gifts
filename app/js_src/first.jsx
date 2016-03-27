import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import {Component} from 'react'

const formReducer = function(state = {value: 0} , action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, {value: state.value + 1});
    case 'DECREMENT':
      return Object.assign({}, {value: state.value - 1});
    default:
      return state;
  }
}

class Counter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <div>
        <h2>{ value }</h2>
        <h3>{ value }</h3>
        <button onClick={ onIncrement }>Inc</button>
        <button onClick={ onDecrement }>Dec</button>
        <button onClick={ () => this.handleIncrement() }>+2</button>
      </div>
    )
  }

  handleIncrement() {
    this.props.onIncrement();
    this.props.onIncrement();

  }
}

const store = createStore(formReducer)

const rootEl = document.getElementById('main')

function render() {
  ReactDOM.render(
    <Counter
      value = { store.getState().value}
      onIncrement = { () => store.dispatch({type: 'INCREMENT' }) }
      onDecrement = { () => store.dispatch({type: 'DECREMENT' }) }
    />,
    rootEl
  )
}

render()
store.subscribe(render)
