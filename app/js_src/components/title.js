// vim: set ft=javascript.jsx:
import React from 'react'
import { connect } from 'react-redux'

class _Title extends React.Component {
  render() {
    return (
      <div>
        Название <input type="text" onChange={ (e) => this.handleChange(e) } />
      </div>
    )
  }

  handleChange(e) {
    this.props.dispatch({type: 'LAYOUT_NAME_CHANGE', name: e.target.value})
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.name
  }
}

const Title = connect(mapStateToProps)(_Title)

export default Title
