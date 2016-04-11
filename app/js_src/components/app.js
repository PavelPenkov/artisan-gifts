// vim: set ft=javascript.jsx:
import React from 'react'
import FileForm from './file_form'
import Layout from './layout'
import ParamEditor from './param_editor'
import Palette from './palette'
import FrameEditor from './frame_editor'
import Preview from './preview'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <FileForm />
        <Layout />
        <table className="palette_table">
          <tbody>
            <tr>
              <td><FrameEditor /></td>
              <td><ParamEditor /></td>
            </tr>
          </tbody>
        </table>
        <Preview />
      </div>
    )
  }

  componentDidMount() {
    console.log(this.props.dispatch);
  }
}

export default App

