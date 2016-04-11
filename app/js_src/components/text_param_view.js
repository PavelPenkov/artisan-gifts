// vim: set ft=javascript.jsx:
import React from 'react'
import { deleteParam } from '../actions'
import { connect } from 'react-redux'

class _TextParamView extends React.Component {
  render() {
    return (
      <div>
        <div>
          Текст <input type="text" value={ this.props.value } onChange= { (e) => this.handleValueChange(e) } />
        </div>
      </div>
    )
  }

  handleValueChange(e) {
    return this.props.onValueChange(this.props.name, e.target.value);
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValueChange: (name, value) => {
      return dispatch({type: 'PARAM_VALUE_CHANGE', value: value, name: name});
    }
  }
}

const TextParamView = connect(mapStateToProps, mapDispatchToProps)(_TextParamView)

export default TextParamView
