import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { createStore } from 'redux'
import ConnectedLayout from './components/layout'
import ConnectedFileForm from './components/file_form'
import LayoutEditor from './components/layout_editor'
import uuid from 'node-uuid'
import { Provider } from 'react-redux'
import App from './components/app'

const initialState = {
  layout: {
    background: {
      url: '/bg.jpg'
    },
    frames: []
  },
  context: {
    params: [
      { id: uuid.v1(), name: 'text_1', type: 'text'},
      { id: uuid.v1(), name: 'overlay_1', type: 'overlay' }
    ]
  }
}

const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
const ADD_PARAM = 'ADD_PARAM'
const CHANGE_PARAM_NAME = 'CHANGE_PARAM_NAME'
const CHANGE_PARAM_TYPE = 'CHANGE_PARAM_TYPE'

const artisanReducer = function(state = initialState, action) {
  switch(action.type) {
    case CHANGE_BACKGROUND:
      return Object.assign({}, state, { layout: { background: action.url }});
    case CHANGE_PARAM_NAME:
      break;
    case CHANGE_PARAM_TYPE:
      break;
    case ADD_PARAM:
      let p = { id: uuid.v1(), name: 'text', type: 'text'}
      return Object.assign({}, state, { context: { params: state.context.params.concat(p)}});
    default:
      return state;
  }
}

const store = createStore(artisanReducer);

render(
  <Provider store={ store } >
    <App />
  </Provider>,
  document.getElementById('main')
);
