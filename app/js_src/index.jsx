import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import { createStore } from 'redux'
import uuid from 'node-uuid'
import { Provider } from 'react-redux'
import App from './components/app'
import request from 'superagent'
import update from 'react-addons-update'

//const initialState = {
  //layout: {
    //background: {
      //id: 31,
      //url: '/bg.jpg'
    //},
    //frames: [
      //{
        //id: uuid.v1(),
        //name: 'overlay_1',
        //type: 'overlay',
        //top: 50,
        //left: 50,
        //width: 300,
        //height: 200,
        //param: 'image_1'
      //}
    //]
  //},
  //context: {
    //params: [
      //{ id: uuid.v1(), name: 'text_1', type: 'text', value: ''},
      //{ id: uuid.v1(), name: 'image_1', type: 'image', value: '' }
    //]
  //}
//}
//

const initialState = {
  layout: {
    background: {
      id: 31,
      url: '/bg.jpg'
    },
    frames: []
  },
  context: {
    params: []
  }
}

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

let nextParamSuffix = 1;
let nextFrameSuffix = 1;

const updatedFrame = (state, id, props) => {
  let newFrames = _.map(state.layout.frames, (frame) => {
    return (frame.id === id ? Object.assign({}, frame, props) : frame)
  })
  let newLayout = Object.assign({}, state.layout, { frames: newFrames });
  return Object.assign({}, state, { layout: newLayout });
}

const addFrame = (state) => {
  let frame = {
    id: uuid.v1(),
    name: `Frame_${nextFrameSuffix++}`,
    type: 'text',
    top: 0,
    left: 0,
    width: 300,
    height: 200,
    param: '',
    font: 'fixed',
    color: '#FFFFFF'
  }

  let newFrames = state.layout.frames.concat(frame);
  let newLayout = Object.assign({}, state.layout, { frames: newFrames });
  return Object.assign({}, state, { layout: newLayout });
}

const artisanReducer = function(state = initialState, action) {
  switch(action.type) {
    case CHANGE_BACKGROUND:
      var newLayout = Object.assign({}, state.layout, { background: {url: action.url, id: action.id }});
      return Object.assign({}, state, { layout: newLayout });
    case ADD_PARAM:
      let p = { id: uuid.v1(), name: `text_${nextParamSuffix++}`, type: 'text', value: '', font: 'fixed', color: '#FFFFFF' }
      return Object.assign({}, state, { context: { params: state.context.params.concat(p)}});
    case PARAM_DELETE:
      var newParams = _.filter(state.context.params, (p) => p.id !== action.id)
      return Object.assign({}, state, { context: { params: newParams }});
    case PARAM_NAME_CHANGE:
      var newParams = _.map(state.context.params, (p) => {
        return (p.id === action.id ? Object.assign({}, p, { name: action.name }) : p);
      })
      return Object.assign({}, state, { context: { params: newParams }});
    case PARAM_TYPE_CHANGE:
      var newParams = _.map(state.context.params, (p) => {
        return (p.id === action.id ? Object.assign({}, p, { type: action.newType }) : p);
      })
      return Object.assign({}, state, { context: { params: newParams }});
    case PARAM_VALUE_CHANGE:
      var newParams = _.map(state.context.params, (p) => {
        return (p.id === action.id ? Object.assign({}, p, { value: action.value }) : p);
      })
      return Object.assign({}, state, { context: { params: newParams }});
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
      return addFrame(state);
    case SHOW_PREVIEW:
      return Object.assign({}, state, {previewUrl: action.url });
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
