// vim: set ft=javascript.jsx:
import React from 'react'
import Palette from './palette'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createFrame } from '../actions'
import fetch from 'isomorphic-fetch'
import promise from 'es6-promise'

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
        <button onClick={ () => this.props.handleAdd() }>Добавить блок</button>
        <button onClick={ () => this.handleSaveClick() }>Сохранить</button>
      </div>
    )
  }

  handleSaveClick() {
    fetch(templateUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: this.props.theState
      })
    }).then(() => {
      this.props.handleSave()
    })
  }
}

const mapStateToProps = (state) => {
  return {
    frames: state.layout.frames,
    theState: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: () => {
      dispatch(createFrame());
    },
    handleSave: () => {
      return dispatch({type: 'LAYOUT_SAVED'});
    }
  }
}

const FrameEditor = connect(mapStateToProps, mapDispatchToProps)(_FrameEditor)

export default FrameEditor
