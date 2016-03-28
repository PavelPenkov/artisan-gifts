import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { createStore } from 'redux'
import Layout from './components/layout'
import FileForm from './components/fileForm'
import LayoutEditor from './components/layout_editor'
import Actions from './actions'
import uuid from 'node-uuid'

const initialState = {
  layout: {
    background: '/bg.jpg',
    frames: []
  },
  context: {
    params: [
      { id: uuid.v1(), name: 'text_1', type: 'text'},
      { id: uuid.v1(), name: 'overlay_1', type: 'overlay' }
    ]
  }
}

const artisanReducer = function(state = initialState, action) {
  switch(action.type) {
    case Actions.CHANGE_BACKGROUND:
      return Object.assign({}, state, { layout: { background: action.url }});
    case Actions.CHANGE_PARAM_NAME:
      break;
    case Actions.CHANGE_PARAM_TYPE:
      break;
    case Actions.ADD_PARAM:
      let p = { id: uuid.v1(), name: 'text', type: 'text'}
      return Object.assign({}, state, { context: { params: state.context.params.concat(p) }});
    default:
      return state;
  }
}

const store = createStore(artisanReducer);

function render() {
  ReactDOM.render(
    <div>
      <FileForm changeBackground={ (url) => store.dispatch({type: Actions.CHANGE_BACKGROUND, url: url}) } />
      <Layout frames={ store.getState().layout.frames } background = { store.getState().layout.background } />
      <LayoutEditor params= { store.getState().context.params } onAddParam = { () => store.dispatch({type: Actions.ADD_PARAM }) } />
    </div>,
    document.getElementById("main")
  );
}

render();
store.subscribe(render);
