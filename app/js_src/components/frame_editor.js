// vim: set ft=javascript.jsx:
import React from 'react'
import Palette from './palette'
import _ from 'lodash'
import { connect } from 'react-redux'

class _FrameEditor extends React.Component {
  render() {
    let palettes = _.map(this.props.frames, (frame) => <Palette frame={frame} key={frame.id}/>);
    return (
      <div>
        <div>
          <hr />
          <h2>Frames</h2>
          <br />
          { palettes }
        </div>
        <button onClick={ () => this.props.handleAdd() }>Добавить блок</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    frames: state.layout.frames
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: () => {
      dispatch({type: 'ADD_FRAME'});
    }
  }
}

const FrameEditor = connect(mapStateToProps, mapDispatchToProps)(_FrameEditor)

export default FrameEditor
