// vim: set ft=javascript.jsx:
import React from 'react'
import ParamView from './param_view'
import _ from 'lodash'
import { connect } from 'react-redux'
import request from 'superagent'

class _ParamList extends React.Component {
  render() {
    let params = _.map(this.props.params, (param, i) => <ParamView key={param.name} name={param.name} type={param.type} />);
    return (
      <div>
        <div>
          <hr />
          <h2>Параметры:</h2>
          { params }
        </div>
        <div>
          <button onClick={ () => this.handlePreviewClick() }>Предварительный просмотр</button>
        </div>
        <div>
          <img src= { this.props.url } />
        </div>
      </div>
    )
  }

  handlePreviewClick() {
    let formData = new FormData();
    _.forEach(this.props.values, (value, key) => {
      formData.append(key, value);
    })
    fetch(`${window.location}/preview.json`, {
      method: 'POST',
      body: formData
    }).then((response) => {
      if(response.status < 400) {
        response.json().then((data) => this.props.previewReady(data.url))
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    params: state.params,
    url: state.previewUrl || '/empty.png',
    values: state.values
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    previewReady: (url) => {
      dispatch({type: 'PREVIEW_READY', url: url})
    }
  }
}

const ParamList = connect(mapStateToProps, mapDispatchToProps)(_ParamList)

export default ParamList
