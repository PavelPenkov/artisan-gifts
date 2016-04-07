// vim: set ft=javascript.jsx:
import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'

class _Preview extends React.Component {
  render() {
    return(
      <div>
        <div>
          <button onClick={() => this.handleClick() }>Предварительный просмотр</button>
        </div>
        <img src={ this.props.url }></img>
      </div>
    )
  }

  handleClick() {
    request
    .post('/layouts/preview')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(this.props.theState)
    .end((err, res) => {
      return this.props.showPreview(JSON.parse(res.text).url);
    })
  }
}

const mapStateToProps = (state) => {
  let url = state.previewUrl || state.layout.background.url;
  return { url: url,
    theState: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showPreview: (url) => {
      return dispatch({ type: 'SHOW_PREVIEW', url: url });
    }
  }
}

const Preview = connect(mapStateToProps, mapDispatchToProps)(_Preview)

export default Preview


