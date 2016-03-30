// vim: set ft=javascript.jsx:
import React from 'react'

class Frame extends React.Component {
  render() {
    let style = { width: this.props.width + "px", height: this.props.height + "px" , top: this.props.top + "px" , left: this.props.left + "px" };
    return (
      <div className="frame" style={ style } >
        { this.props.name }
      </div>
    )
  }
}

export default Frame
