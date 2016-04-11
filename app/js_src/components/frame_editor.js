// vim: set ft=javascript.jsx:
import React from 'react'
import Palette from './palette'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createFrame, fetchAction } from '../actions'
import fetch from 'isomorphic-fetch'
import promise from 'es6-promise'
import { saveLayout } from '../actions'

promise.polyfill()

class _FrameEditor extends React.Component {
  render() {
    let palettes = _.map(this.props.frames, (frame) => <Palette frame={frame} key={frame.id}/>);
    return (
      <div>
        <div>
          <hr />
          <h2>Блоки</h2>
          <br />
          { palettes }
        </div>
        <button onClick={ () => this.handleAddClick() }>Добавить блок</button>
        <button onClick={ () => this.handleSaveClick() }>Сохранить</button>
      </div>
    )
  }

  handleAddClick() {
    return this.props.dispatch(createFrame());
  }

  handleSaveClick() {
    fetch(this.props.url, {
      method: this.props.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: this.props.theState.layout})
    }).then((response) => {
      if(response.status >= 400) {
        this.props.dispatch({type: 'LAYOUT_SAVE_ERROR'})
      } else {
        this.props.dispatch({type: 'LAYOUT_SAVED', url: response.headers.get('Location')})
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    frames: state.layout.frames,
    theState: state,
    method: state.method,
    url: state.url
  }
}

const FrameEditor = connect(mapStateToProps)(_FrameEditor)

export default FrameEditor
