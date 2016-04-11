import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import ParamList from './components/param_list'
import update from 'react-addons-update'

promise.polyfill()


const initialState = { params: params.params, values: params.values, previewUrl: '' };

const previewReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'PARAM_VALUE_CHANGE':
      let name = action.name
      return update(state, { values: { [action.name]: { $set: action.value }}});
    case 'PREVIEW_READY':
      return update(state, { previewUrl: { $set: action.url }});
    default:
      return state
  }
}

const store = createStore(previewReducer)

render(
  <Provider store={ store } >
    <ParamList />
  </Provider>,
  document.getElementById('preview')
)
