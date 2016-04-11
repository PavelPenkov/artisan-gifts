import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { createStore, applyMiddleware } from 'redux'
import uuid from 'node-uuid'
import { Provider } from 'react-redux'
import Editor from './components/editor'
import update from 'react-addons-update'
import thunk from 'redux-thunk'

const initialState = template // set by server

const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
const ADD_PARAM = 'ADD_PARAM'
const PARAM_NAME_CHANGE = 'PARAM_NAME_CHANGE'
const PARAM_TYPE_CHANGE = 'PARAM_TYPE_CHANGE'
const PARAM_VALUE_CHANGE = 'PARAM_VALUE_CHANGE'
const FRAME_FONT_CHANGE = 'FRAME_FONT_CHANGE'
const FRAME_COLOR_CHANGE = 'FRAME_COLOR_CHANGE'
const PARAM_DELETE = 'PARAM_DELETE'
const FRAME_TRANSFORM = 'FRAME_TRANSFORM'
const FRAME_TYPE_CHANGE = 'FRAME_TYPE_CHANGE'
const SET_DIMENSIONS = 'SET_DIMENSIONS'
const FRAME_PARAM_CHANGE = 'FRAME_PARAM_CHANGE'
const SHOW_PREVIEW = 'SHOW_PREVIEW'
const ADD_FRAME = 'ADD_FRAME'
const DELETE_FRAME = 'DELETE_FRAME'
const LAYOUT_SAVED = 'LAYOUT_SAVED'

let nextParamSuffix = 1;
let nextFrameSuffix = 1;

const updatedFrame = (state, id, props) => {
  let newFrames = _.map(state.layout.frames, (frame) => {
    return (frame.id === id ? Object.assign({}, frame, props) : frame)
  })
  let newLayout = Object.assign({}, state.layout, { frames: newFrames });
  return Object.assign({}, state, { layout: newLayout });
}

const editorReducer = function(state = initialState, action) {
  switch(action.type) {
    case CHANGE_BACKGROUND:
      var newLayout = Object.assign({}, state.layout, { background: {url: action.url, id: action.id }});
      return Object.assign({}, state, { layout: newLayout });
    case FRAME_TRANSFORM:
      let newProp = {};
      newProp[action.property] = action.value;
      return updatedFrame(state, action.id, newProp);
    case FRAME_TYPE_CHANGE:
      return updatedFrame(state, action.id, {type: action.newType});
    case FRAME_PARAM_CHANGE:
      return updatedFrame(state, action.id, {param: action.name });
    case FRAME_COLOR_CHANGE:
      return updatedFrame(state, action.id, {color: action.color });
    case FRAME_FONT_CHANGE:
      return updatedFrame(state, action.id, {font: action.font });
    case SET_DIMENSIONS:
      return Object.assign({}, state, {width: action.width, height: action.height });
    case ADD_FRAME:
      return update(state, {
        layout: {
          frames: { $push: [action.frame] }
        }
      })
    case DELETE_FRAME:
      let filter = (xs) => {
        return _.filter(xs, (x) => x.id !== action.id)
      }
      return update(state, {
        layout: {
          frames: { $apply: filter }
        }
      });
    case LAYOUT_SAVED:
      alert('Шаблон сохранен');
      return state;
    default:
      return state;
  }
}

const store = createStore(editorReducer, applyMiddleware(thunk));

render(
  <Provider store={ store } >
    <Editor />
  </Provider>,
  document.getElementById('main')
);
