// vim: set ft=javascript.jsx:
import React from 'react'
import { deleteParam } from '../actions'
import { connect } from 'react-redux'
import ImageParamView from './image_param_view'
import TextParamView from './text_param_view'

class _ParamView extends React.Component {
  render() {
    var paramEditor;
    if (this.props.type === 'text') {
      paramEditor = <TextParamView value={ this.props.value } type={ this.props.type } name={ this.props.name } />
    }

    if (this.props.type === 'image') {
      paramEditor = <ImageParamView value={ this.props.value } type={ this.props.type } name={ this.props.name } />
    }

    return (
      <div className="palette">
        <div>
          <div>{ this.props.name }</div>
        </div>
        <div>
          { paramEditor }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.values[ownProps.name]
  }
}

const ParamView = connect(mapStateToProps)(_ParamView)

export default ParamView
