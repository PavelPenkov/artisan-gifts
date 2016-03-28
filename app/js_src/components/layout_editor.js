// vim: set ft=javascript.jsx:
import React from 'react'
import Param from './param'
import _ from 'lodash'

class LayoutEditor extends React.Component {
  render() {
    let params = _.map(this.props.params, (param, i) => <Param key={param.id} name={param.name} type={param.type} />); 
    return (
      <div>
        <div>
          Params:
          <br />
          { params }
        </div>
        <button onClick={ () => this.handleAdd() }>Add param</button>
      </div>
    )
  }

  handleAdd() {
    console.log('In handle add');
    this.props.onAddParam();
  }
}

export default LayoutEditor
