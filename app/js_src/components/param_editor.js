// vim: set ft=javascript.jsx:
import React from 'react'
import Param from './param'
import _ from 'lodash'
import { connect } from 'react-redux'

class _ParamEditor extends React.Component {
  render() {
    let params = _.map(this.props.params, (param, i) => <Param paramId={param.id} key={param.id} name={param.name} type={param.type} value={param.value}/>);
    return (
      <div>
        <div>
          <hr />
          <h2>Параметры:</h2>
          <br />
          { params }
        </div>
        <button onClick={ () => this.props.handleAdd() }>Add param</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    params: state.context.params
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: () => {
      dispatch({type: 'ADD_PARAM'});
    }
  }
}

const ParamEditor = connect(mapStateToProps, mapDispatchToProps)(_ParamEditor)

export default ParamEditor
