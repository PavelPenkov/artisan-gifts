// vim: set ft=javascript.jsx:
import React from 'react'
import { deleteParam } from '../actions'
import { connect } from 'react-redux'
import request from 'superagent'

class _ImageParam extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => this.handleSubmit() } >
          File: <input type="file" onChange= { (e) => this.handleValueChange(e) } />
        </form>
      </div>
    )
  }

  handleSubmit() {
    e.preventDefault();
  }

  handleValueChange(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({progress: 0});
    let self = this;
    reader.onload = (upload) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/images.json", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      let paramId = this.props.paramId;
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let resp = JSON.parse(xhr.responseText)
          return this.props.onFileUploaded(paramId, resp.id);
        }
      }

      let body = `image[image]=${encodeURIComponent(upload.target.result)}`
      xhr.send(body)
    }
    reader.readAsDataURL(file);
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => {
      return dispatch(deleteParam(id))
    },
    onFileUploaded: (id, value) => {
      return dispatch({type: 'PARAM_VALUE_CHANGE', id: id, value: value});
    }
  }
}

const ImageParam = connect(mapStateToProps, mapDispatchToProps)(_ImageParam)

export default ImageParam
