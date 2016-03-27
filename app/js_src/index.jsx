import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { createStore } from 'redux'
import Layout from './components/layout'
import FileForm from './components/fileForm'

const initialState = {
  layout: {
    background: '/bg.jpg',
    frames: []
  }
}

const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND';

const artisanReducer = function(state = initialState, action) {
  switch(action.type) {
    case CHANGE_BACKGROUND:
      return Object.assign({}, { layout: { background: action.url }});
    default:
      return state;
  }
}

const store = createStore(artisanReducer);

function render() {
  ReactDOM.render(
    <div>
      <FileForm changeBackground={ (url) => store.dispatch({type: CHANGE_BACKGROUND, url: url}) } />
      <Layout frames={ store.getState().layout.frames } background = { store.getState().layout.background } />
    </div>,
    document.getElementById("main")
  );
}

render();
store.subscribe(render);
