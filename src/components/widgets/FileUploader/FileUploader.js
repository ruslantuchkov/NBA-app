import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { firebase } from '../../../firebase';

class Uploader extends Component {
  state = {
    name: '',
    isUploading: false,
    progress: 0,
    fileURL: ''
  };

  hanleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
  };

  handleUploadError = err => {
    this.setState({ isUploading: false });
    console.log(err);
  };

  handleUploadSuccess = fileName => {
    this.props.storeFilename(fileName);

    this.setState({ name: fileName, isUploading: false, progress: 100 });

    firebase
      .storage()
      .ref('images')
      .child(fileName)
      .getDownloadURL()
      .then(url => {
        this.setState({ fileURL: url });
      });
  };

  handleProgress = progress => {
    this.setState({ progress });
  };

  render() {
    return (
      <div>
        <FileUploader
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.hanleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
        {this.state.isUploading ? <p>Progress:{this.state.progress}</p> : null}
        {this.state.fileURL ? (
          <img style={{ width: '300px' }} src={this.state.fileURL} alt="" />
        ) : null}
      </div>
    );
  }
}

export default Uploader;
