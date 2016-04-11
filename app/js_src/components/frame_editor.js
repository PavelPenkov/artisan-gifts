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
        <button onClick={ () => this.props.handleAdd() }>Добавить блок</button>
        <button onClick={ () => this.props.handleSaveClick() }>Сохранить</button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    frames: state.layout.frames,
    theState: state
  }
}

//const mapDispatchToProps = (dispatch) => {
  //return {
    //handleAdd: () => {
      //dispatch(createFrame());
    //},
    //handleSaveClick: () => {
      //return fetchAction();
    //}
  //}
//}
//

const mapDispatchToProps = {
  handleAdd: () => {
    return (
      (dispatch) => {
        dispatch(createFrame());
      }
    )
  },
  handleSaveClick: () => {
    return (
      (dispatch) => {
        dispatch(createFrame());
      }
    )
  }
}


const FrameEditor = connect(mapStateToProps, mapDispatchToProps)(_FrameEditor)

export default FrameEditor
