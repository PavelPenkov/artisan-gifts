// vim: set ft=javascript.jsx:
import React from 'react'
import { deleteParam } from '../actions'
import { connect } from 'react-redux'

class _TextParam extends React.Component {
  render() {
    let fontOptions = _.map(window.__fonts, (font, i) => <option key={i} value={font}>{font}</option>)
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

  handleColorChange(e) {
    return this.props.onColorChange(this.props.paramId, e.target.value);
  }

  handleFontChange(e) {
    return this.props.onFontChange(this.props.paramId, e.target.value);
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onValueChange: (id, value) => {
      return dispatch({type: 'PARAM_VALUE_CHANGE', value: value, id: id});
    },

    onColorChange: (id, color) => {
      return dispatch({type: 'PARAM_COLOR_CHANGE', color: color, id: id});
    },

    onFontChange: (id, font) => {
      return dispatch({type: 'PARAM_FONT_CHANGE', font: font, id: id});
    }
  }
}

const TextParam = connect(mapStateToProps, mapDispatchToProps)(_TextParam)

export default TextParam
