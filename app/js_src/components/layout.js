// vim: set ft=javascript.jsx:
import React from 'react'
import _ from 'lodash'
import Frame from './frame'
import { connect } from 'react-redux'

class Layout extends React.Component {
  render() {
    let frames = _.map(this.props.frames,  (frame, i) => <Frame key={i} width={frame.width} height={frame.height} top={frame.top} left={frame.left} name={frame.name}/> );
    return (
      <div id="background" className="layout">
        <img src={this.props.background} />
        { frames }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    background: state.layout.background.url,
    frames: state.layout.frames
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

const ConnectedLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default ConnectedLayout
