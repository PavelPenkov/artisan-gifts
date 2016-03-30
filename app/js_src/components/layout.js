// vim: set ft=javascript.jsx:
import React from 'react'
import _ from 'lodash'
import Frame from './frame'
import { connect } from 'react-redux'
import request from 'superagent'
import { fetchPreview } from '../actions'

class _Layout extends React.Component {
  render() {
    let frames = _.map(this.props.frames,  (frame, i) => <Frame key={i} width={frame.width} height={frame.height} top={frame.top} left={frame.left} name={frame.name} param={frame.param} /> );
    return (
      <div id="background" className="layout">
        <img src={this.props.background} id="bg_image" />
        <hr />
        { frames }
      </div>
    );
  }

  componentDidMount() {
    let elem = document.getElementById('bg_image');
    let dim = elem.getBoundingClientRect();
    this.props.onMount(dim.width, dim.height);
  }
}

const mapStateToProps = (state) => {
  return {
    background: state.layout.background.url,
    frames: state.layout.frames
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (w, h) => {
      return dispatch({type: 'SET_DIMENSIONS', width: w, height: h});
    }
  }
}

const Layout = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Layout)

export default Layout
