// vim: set ft=javascript.jsx:
import React from 'react'
import { deleteParam } from '../actions'
import { connect } from 'react-redux'

class _TextParam extends React.Component {
  render() {
    return (
      <div>
        <div>
          Text: <input type="text" value={ this.props.value } onChange= { (e) => this.handleValueChange(e) } />
        </div>
      </div>
    )
  }

  handleValueChange(e) {
    return this.props.onValueChange(this.props.paramId, e.target.value);
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValueChange: (id, value) => {
      return dispatch({type: 'PARAM_VALUE_CHANGE', value: value, id: id});
    }
  }
}

const TextParam = connect(mapStateToProps, mapDispatchToProps)(_TextParam)

export default TextParam
