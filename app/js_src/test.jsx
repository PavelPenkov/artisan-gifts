import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { Component } from 'react'
import React from 'react'
import { render } from 'react-dom'

promise.polyfill()

class _Panel extends Component {
  render() {
    return (
      <div>
        <div>Name: { this.props.name }</div>
        <div>
          <button onClick={ () => this.props.handleClick() }>Update</button>
        </div>
      </div>
    )
  }
}

const fetchAction = () => {
  return (
    (dispatch) => {
      return fetch('/templates/1.json').then((response) => {
        response.json().then((data) => dispatch({type: 'TEMPLATE', name: data.name}))
        }
      )
    }
  )
}

const mapStateToProps = (state) => {
  return {
    name: state.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      return fetchAction()
    }
  }
}

//const mapDispatchToProps = {
  //handleClick: () => {
    //return fetchAction()
  //}
//}

const Panel = connect(mapStateToProps, mapDispatchToProps)(_Panel)

const initialState = { name: '' }

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'TEMPLATE':
      return { name: action.name }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

render(
  <Provider store={ store } >
    <Panel />
  </Provider>,
  document.getElementById('main')
)
