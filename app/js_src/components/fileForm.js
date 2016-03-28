// vim: set ft=javascript.jsx:
import React from 'react'

class FileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0 };
  }

  render() {
    return (<form onSubmit={ (e) => this.handleSubmit(e) } encType="multipart/form-data">
      <input type="file" onChange={(e) => this.handleFile(e) } accept="image/png,image/jpeg" />
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
    //var csrfParam = _.find(document.getElementsByTagName('meta'), (elem) => elem.getAttribute("property") === "csrf-param").getAttribute("content");
    //var csrfToken = _.find(document.getElementsByTagName('meta'), (elem) => elem.getAttribute("property") === "csrf-token").getAttribute("content");
    reader.onload = (upload) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/images.json", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.upload.onprogress = (e) => self.setState({progress: e.loaded / e.total});
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let url = JSON.parse(xhr.responseText).url;
          this.props.changeBackground(url);
        }
      }

      let body = `image[image]=${encodeURIComponent(upload.target.result)}`
      xhr.send(body)
    }
    reader.readAsDataURL(file);
  }
}

export default FileForm
