// vim: set ft=javascript.jsx:
import React from 'react'

class Param extends React.Component {
  render() {
    return (
      <div>
        <div>
          Name:
          <input type="text" value={ this.props.name } onChange= { () => this.handleTypeChange() } />
        </div>
        <div>
          Type:
            <select value={ this.props.type } onChange={ () => this.handleTypeChange() } >
              <option value="text">Text</option>
              <option value="overlay">Overlay</option>
            </select>
        </div>
        <div>
          <button onClick={ () => this.handleDelete() }>Delete</button>
        </div>
      </div>
    )
  }

  handleDelete() {}

  handleNameChange() {}

  handleTypeChange() {}
}

export default Param
