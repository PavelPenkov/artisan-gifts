// vim: set ft=javascript.jsx:
import React from 'react'
import { connect } from 'react-redux'
import { transformFrame, changeFrameType } from '../actions'

class _Palette extends React.Component {
  render() {
    return (<div className="palette">
      <div>Frame: { this.props.frame.name }</div>
      <table>
        <tbody>
          <tr>
            <td>Type</td>
            <td>
              <select value={ this.props.frame.type } onChange= { (e) => this.handleTypeChange(e) } >
                <option value="text">Text</option>
                <option value="overlay">Overlay</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Param</td>
            <td>
              <input type="text" value={ this.props.frame.param} onChange= { (e) => this.handleParamChange(e) } />
            </td>
          </tr>
          <tr>
            <td>Top</td>
            <td>
              <input type="range" onChange={ (e) => this.handlePosChange(e, 'top') } value={ this.props.frame.top } min="0" max={ this.props.height } />
            </td>
          </tr>
          <tr>
            <td>Left</td>
            <td>
              <input type="range" onChange={ (e) => this.handlePosChange(e, 'left') } value={ this.props.frame.left } min="0" max={ this.props.width } />
            </td>
          </tr>
          <tr>
            <td>Width</td>
            <td>
              <input type="range" onChange={ (e) => this.handlePosChange(e, 'width') } value= { this.props.frame.width } min="0" max={this.props.width } />
            </td>
          </tr>
          <tr>
            <td>Height</td>
            <td>
              <input type="range" onChange={ (e) => this.handlePosChange(e, 'height') } value = { this.props.frame.height } min="0" max={this.props.height} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   );
  }

  handlePosChange(e, property) {
    return this.props.frameDimChange(this.props.frame.id, property, e.target.value);
  }

  handleTypeChange(e) {
    return this.props.frameTypeChange(this.props.frame.id, e.target.value);
  }

  handleParamChange(e) {
    return this.props.frameParamChange(this.props.frame.id, e.target.value);
  }
}

const mapStateToProps = (state) => {
  return {
    width: state.width || 800,
    height: state.height || 600
  }
};

const mapDispatchToProps = (dispatch) => { return {
    frameDimChange: (id, property, val) => {
      return dispatch(transformFrame(id, property, val));
    },

    frameTypeChange: (id, type) => {
      return dispatch({type: 'FRAME_TYPE_CHANGE', id: id, newType: type});
    },

    frameParamChange: (id, name) => {
      return dispatch({type: 'FRAME_PARAM_CHANGE', id: id, name: name});
    }
  }
}

const Palette = connect(mapStateToProps, mapDispatchToProps)(_Palette)

export default Palette
