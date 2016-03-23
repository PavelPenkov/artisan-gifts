import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

class Editor extends React.Component {
  render() {
    let frames = [{name: 'Text 1', width: 300, height: 300, top: 100, left: 100}];
    let params = [{name: 'Text_1', value: 'Alice'}];
    return (
      <div id="editor">
        <Layout frames={frames} background="/bg.jpg" />
        <Palette />
        <Context params={params} />
      </div>
    );
  }
}

class Layout extends React.Component {
  render() {
    let frames = _.map(this.props.frames,  (frame, i) => <Frame key={i} width={frame.width} height={frame.height} top={frame.top} left={frame.left} name={frame.name}/> );
    return (
      <div>
        <FileForm />
        <div id="background" className="layout">
          <img src={this.props.background} />
          { frames }
        </div>
      </div>
    );
  }
}

class FileForm extends React.Component {
  constructor() {
    super()
    this.state = { url: null, progress: 0 }
  }

  render() {
    return (<form onSubmit={ (e) => this.handleSubmit(e) } encType="multipart/form-data">
      <input type="file" onChange={(e) => this.handleFile(e) } />
      <progress value={this.state.progress} />
    </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleFile(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({progress: 0});
    let self = this;
    //debugger;
    //var csrfParam = _.find(document.getElementsByTagName('meta'), (elem) => elem.getAttribute("property") === "csrf-param").getAttribute("content");
    //var csrfToken = _.find(document.getElementsByTagName('meta'), (elem) => elem.getAttribute("property") === "csrf-token").getAttribute("content");
    reader.onload = (upload) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/images.json", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.upload.onprogress = (e) => self.setState({progress: e.loaded / e.total});
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let url = JSON.parse(xhr.responseText)['url'];
          console.log(url);
          self.setState({url: url});
        }
      }

      let body = `image[image]=${encodeURIComponent(upload.target.result)}`
      xhr.send(body)
    }
    reader.readAsDataURL(file);
  }
}


class Frame extends React.Component {
  render() {
    let style = { width: this.props.width + "px", height: this.props.height + "px" , top: this.props.top + "px" , left: this.props.left + "px" };
    return (
      <div className="frame" style={ style } onClick={ (e) => this.handleClick(e) } >
        { this.props.name }
      </div>
    )
  }

  handleClick(event) {
    console.log(this.props.name);
  }
}

class Palette extends React.Component {
  render() {
    return (<div className="palette">
      <table>
        <tbody>
          <tr>
            <td>Top</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Left</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Width</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Height</td><td><input type="range" /></td>
          </tr>
          <tr>
            <td>Type</td>
            <td>
              <select>
                <option value="Text">Text</option>
                <option value="Overlay">Overlay</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
   );
  }
}

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

const mapStateToProps = (state) => {
  return { background: state.background, frames: [], context: { params: [] }};
}

const initialState = {
  background: '/bg.jpg',
  frames: [],
  context: { params: [] }
}

const SET_BACKGROUND = 'SET_BACKGROUND';

function editorApp(state = initialState, action) {
  switch(action.type) {
    case SET_BACKGROUND:
      return Object.assign({}, state, { background: action.url })
    default:
      return state;
  }
}

ReactDOM.render(
  <Editor />,
  document.getElementById("main")
);
