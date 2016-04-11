// vim: set ft=javascript.jsx:
import React from 'react'
import { deleteParam } from '../actions'
import { connect } from 'react-redux'
import request from 'superagent'

class _ImageParamView extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={ () => this.handleSubmit() } >
          Файл <input type="file" onChange= { (e) => this.handleValueChange(e) } />
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
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let resp = JSON.parse(xhr.responseText)
          return this.props.onFileUploaded(this.props.name, resp.id);
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
    onFileUploaded: (name, value) => {
      return dispatch({type: 'PARAM_VALUE_CHANGE', name: name, value: value});
    }
  }
}

const ImageParamView = connect(mapStateToProps, mapDispatchToProps)(_ImageParamView)

export default ImageParamView
