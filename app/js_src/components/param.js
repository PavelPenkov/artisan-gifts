// vim: set ft=javascript.jsx:
import React from 'react'
import { deleteParam } from '../actions'
import { connect } from 'react-redux'
import ImageParam from './image_param'
import TextParam from './text_param'

class _Param extends React.Component {
  render() {
    var paramEditor;
    if (this.props.type === 'text') {
      paramEditor = <TextParam value={ this.props.value } type={ this.props.type } paramId= { this.props.paramId } />
    }

    if (this.props.type === 'image') {
      paramEditor = <ImageParam value={ this.props.value } type={ this.props.type } paramId = { this.props.paramId } />
    }

    return (
      <div className="palette">
        <div>
          Name:
          <input type="text" value={ this.props.name } onChange={ (e) => this.handleNameChange(e) } />
        </div>
        <div>
          Type:
            <select value={ this.props.type } onChange={ (e) => this.handleTypeChange(e) } >
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
        </div>
        <div>
          { paramEditor }
        </div>
        <div>
          <button onClick={ () => this.handleDeleteClick() }>Delete</button>
        </div>
      </div>
    )
  }

  handleDeleteClick() {
    return this.props.onDelete(this.props.paramId);
  }

  handleNameChange(evt) {
    return this.props.onNameChange(this.props.paramId, evt.target.value);
  }

  handleTypeChange(evt) {
    return this.props.onTypeChange(this.props.paramId, evt.target.value);
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTypeChange: (id, newType) => {
      return dispatch({type: 'PARAM_TYPE_CHANGE', id: id, newType: newType})
    },

    onNameChange: (id, name) => {
      return dispatch({type: 'PARAM_NAME_CHANGE', id: id, name: name})
    },

    onDelete: (id) => {
      return dispatch(deleteParam(id))
    }
  }
}

const Param = connect(mapStateToProps, mapDispatchToProps)(_Param)

export default Param
