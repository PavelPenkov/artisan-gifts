// vim: set ft=javascript.jsx:
import React from 'react'
import _ from 'lodash'

class Context extends React.Component {
  render() {
    return (
      <div className="context">
        <table>
          <tbody>
            { _.map(this.props.params, (param) => <tr><td>{param.name}</td><td><input type="text" value={param.value} /></td></tr>) }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Context
