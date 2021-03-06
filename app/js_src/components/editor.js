// vim: set ft=javascript.jsx:
import React from 'react'
import FileForm from './file_form'
import Layout from './layout'
import ParamEditor from './param_editor'
import Palette from './palette'
import FrameEditor from './frame_editor'
import Preview from './preview'
import Title from './title'

class Editor extends React.Component {
  render() {
    return (
      <div>
        <Title />
        <FileForm />
        <Layout />
        <FrameEditor />
      </div>
    )
  }
}

export default Editor

