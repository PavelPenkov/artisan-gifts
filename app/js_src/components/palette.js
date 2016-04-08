// vim: set ft=javascript.jsx:
import React from 'react'
import { connect } from 'react-redux'
import { transformFrame, changeFrameType } from '../actions'
import uuid from 'node-uuid'

class _Palette extends React.Component {
  constructor(props) {
    super(props)
    this.state = {uniqueId: uuid.v4()}
  }

  elementId(baseName) {
    return `${baseName}-${this.state.uniqueId}`
  }


  render() {
    let fontOptions = _.map(window.__fonts, (font, i) => <option key={i} value={font}>{font}</option>)
    var extraControls;
    if(this.props.frame.type === 'text') {
      extraControls = (
        <div>
          <div>
            <label htmlFor={ this.elementId('font') }>Шрифт</label>
            <select id={ this.elementId('font') }value={ this.props.frame.font }  onChange= { (e) => this.handleFontChange(e) }>
              { fontOptions }
            </select>
          </div>
          <div>
            <label htmlFor={ this.elementId('color') }>Цвет</label>
            <input id={ this.elementId('color') } type="color" value={ this.props.frame.color} onChange= { (e) => this.handleColorChange(e) } />
          </div>
        </div>
      )
    } else {
      extraControls = <div></div>
    }
    return (
      <span className="palette">
        <div>Блок { this.props.frame.name }</div>
        <table>
          <tbody>
            <tr>
              <td> <label htmlFor={ this.elementId('type') }>Tип</label></td>
              <td>
                <select id={ this.elementId('type') } value={ this.props.frame.type } onChange= { (e) => this.handleTypeChange(e) } >
                  <option value="text">Текст</option>
                  <option value="overlay">Картинка</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <label htmlFor={ this.elementId('param') }>Брать значение из параметра</label>
          <input id={ this.elementId('param') } type="text" value={ this.props.frame.param} onChange= { (e) => this.handleParamChange(e) } />
        </div>
        <div>
          <label htmlFor={ this.elementId('top') }>Верхний край</label>
          <input id={ this.elementId('top') } type="range" onChange={ (e) => this.handlePosChange(e, 'top') } value={ this.props.frame.top } min="0" max={ this.props.height } />
        </div>
        <div>
          <label htmlFor={ this.elementId('left') }>Левый край</label>
          <input id={ this.elementId('left') } type="range" onChange={ (e) => this.handlePosChange(e, 'left') } value={ this.props.frame.left } min="0" max={ this.props.width } />
        </div>
        <div>
          <label htmlFor={ this.elementId('width') }>Ширина</label>
          <input id={ this.elementId('width') } type="range" onChange={ (e) => this.handlePosChange(e, 'width') } value= { this.props.frame.width } min="0" max={this.props.width } />
        </div>
        <div>
          <label htmlFor={ this.elementId('height') }>Высота</label>
          <input id= { this.elementId('width') } type="range" onChange={ (e) => this.handlePosChange(e, 'height') } value = { this.props.frame.height } min="0" max={this.props.height} />
        </div>
        <div>
          { extraControls }
        </div>
        <div>
          <button onClick={ () => this.handleDeleteClick()}>Удалить</button>
        </div>
      </span>
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

  handleColorChange(e) {
    return this.props.frameColorChange(this.props.frame.id, e.target.value);
  }

  handleFontChange(e) {
    return this.props.frameFontChange(this.props.frame.id, e.target.value);
  }

  handleDeleteClick() {
    return this.props.deleteFrame(this.props.frame.id);
  }
}

const mapStateToProps = (state) => {
  return {
    width: state.width || 800,
    height: state.height || 600
  }
};

const mapDispatchToProps = (dispatch) => { 
  return {
    frameDimChange: (id, property, val) => {
      return dispatch(transformFrame(id, property, val));
    },

    frameTypeChange: (id, type) => {
      return dispatch({type: 'FRAME_TYPE_CHANGE', id: id, newType: type});
    },

    frameParamChange: (id, name) => {
      return dispatch({type: 'FRAME_PARAM_CHANGE', id: id, name: name});
    },

    frameColorChange: (id, color) => {
      return dispatch({type: 'FRAME_COLOR_CHANGE', color: color, id: id});
    },

    frameFontChange: (id, font) => {
      return dispatch({type: 'FRAME_FONT_CHANGE', font: font, id: id});
    },

    deleteFrame: (id) => {
      return dispatch({type: 'DELETE_FRAME', id: id});
    }
}
}

const Palette = connect(mapStateToProps, mapDispatchToProps)(_Palette)

export default Palette
