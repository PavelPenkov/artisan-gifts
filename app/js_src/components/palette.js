// vim: set ft=javascript.jsx:
import React from 'react'
import { connect } from 'react-redux'
import { transformFrame, changeFrameType } from '../actions'

class _Palette extends React.Component {
  render() {
    let fontOptions = _.map(window.__fonts, (font, i) => <option key={i} value={font}>{font}</option>)
    var extraControls;
    if(this.props.frame.type === 'text') {
      extraControls = (
        <div>
          <div>
            Шрифт
            <select value={ this.props.frame.font }  onChange= { (e) => this.handleFontChange(e) }>
              { fontOptions }
            </select>
          </div>
          <div>
            Цвет <input type="color" value={ this.props.frame.color} onChange= { (e) => this.handleColorChange(e) } />
          </div>
        </div>
      )
    } else {
      extraControls = <div></div>
    }
    return (
      <div className="palette">
        <div>Блок { this.props.frame.name }</div>
        <div>
          Тип
          <select value={ this.props.frame.type } onChange= { (e) => this.handleTypeChange(e) } >
            <option value="text">Текст</option>
            <option value="overlay">Картинка</option>
          </select>
        </div>
        <div>
          Брать значение из параметра
          <input type="text" value={ this.props.frame.param} onChange= { (e) => this.handleParamChange(e) } />
        </div>
        <div>
          Верхний край
          <input type="range" onChange={ (e) => this.handlePosChange(e, 'top') } value={ this.props.frame.top } min="0" max={ this.props.height } />
        </div>
        <div>
          Левый край
          <input type="range" onChange={ (e) => this.handlePosChange(e, 'left') } value={ this.props.frame.left } min="0" max={ this.props.width } />
        </div>
        <div>
          Ширина
          <input type="range" onChange={ (e) => this.handlePosChange(e, 'width') } value= { this.props.frame.width } min="0" max={this.props.width } />
        </div>
        <div>
          Высота
          <input type="range" onChange={ (e) => this.handlePosChange(e, 'height') } value = { this.props.frame.height } min="0" max={this.props.height} />
        </div>
        <div>
          { extraControls }
        </div>
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

  handleColorChange(e) {
    return this.props.frameColorChange(this.props.frame.id, e.target.value);
  }

  handleFontChange(e) {
    return this.props.frameFontChange(this.props.frame.id, e.target.value);
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
  },

  frameColorChange: (id, color) => {
    return dispatch({type: 'FRAME_COLOR_CHANGE', color: color, id: id});
  },

  frameFontChange: (id, font) => {
    return dispatch({type: 'FRAME_FONT_CHANGE', font: font, id: id});
  }
}
}

const Palette = connect(mapStateToProps, mapDispatchToProps)(_Palette)

export default Palette
