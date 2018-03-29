import React, { Component } from 'react';

import { firebaseTeams, firebaseArticles, firebase } from '../../firebase';
import styles from './dashboard.css';

import FormField from '../widgets/FormFields/FormFields';
import Uploader from '../widgets/FileUploader/FileUploader';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: '',
    loading: false,
    formData: {
      author: {
        element: 'input',
        value: '',
        config: {
          name: 'author_input',
          type: 'text',
          placeholder: 'enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'text',
          placeholder: 'enter the title'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      body: {
        element: 'texteditor',
        value: '',
        valid: true
      },
      team: {
        element: 'select',
        value: '',
        config: {
          name: 'team_input',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      image: {
        element: 'image',
        value: '',
        valid: true
      }
    }
  };

  componentDidMount() {
    this.loadTeams();
  }

  loadTeams = () => {
    firebaseTeams.once('value').then(snapshot => {
      const teams = [];

      snapshot.forEach(childSnapshot => {
        teams.push({
          name: childSnapshot.val().name,
          id: childSnapshot.val().teamId
        });
      });

      const newFormData = {
        ...this.state.formData
      };
      const newElement = {
        ...newFormData['team']
      };
      newElement.config.options = teams;

      newFormData['team'] = newElement;

      this.setState({ formData: newFormData });
    });
  };

  updateForm = (elem, content = '') => {
    const newFormData = {
      ...this.state.formData
    };
    const newElement = {
      ...newFormData[elem.id]
    };

    if (content === '') {
      newElement.value = elem.event.target.value;
    } else {
      newElement.value = content;
    }

    if (elem.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = elem.blur;
    newFormData[elem.id] = newElement;

    this.setState({ formData: newFormData });
  };

  validate = elem => {
    let error = [true, ''];

    if (elem.validation.email) {
      const valid = /\S+@\S+\.\S+/.test(elem.value);
      const message = `${!valid ? 'Must be a valid email' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (elem.validation.password) {
      const valid = elem.value.length >= 5;
      const message = `${!valid ? 'Must be greater than 5' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    if (elem.validation.required) {
      const valid = elem.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }

    return error;
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    for (let key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      this.setState({
        loading: true,
        postError: ''
      });

      firebaseArticles
        .orderByChild('id')
        .limitToLast(1)
        .once('value')
        .then(snapshot => {
          let articleId = null;
          snapshot.forEach(childSnapshot => {
            articleId = childSnapshot.val().id;
          });

          dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;
          dataToSubmit['id'] = articleId + 1;
          dataToSubmit['team'] = parseInt(dataToSubmit['team'], 10);

          firebaseArticles
            .push(dataToSubmit)
            .then(article => {
              this.props.history.push(`/articles/${article.key}`);
            })
            .catch(err => this.setState({ postError: err.message }));
        });
    } else {
      this.setState({ postError: 'Something went wrong' });
    }
  };

  submitButton = () =>
    this.state.loading ? (
      '...loading'
    ) : (
      <div>
        <button type="submit">Add Post</button>
      </div>
    );

  showError = () =>
    this.state.postError !== '' ? (
      <div className={styles.error}>{this.state.postError}</div>
    ) : (
      ''
    );

  onEditorStateChange = editorState => {
    let contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);

    this.updateForm({ id: 'body' }, html);
    this.setState({ editorState });
  };

  storeFilename = fileName => {
    this.updateForm({ id: 'image' }, fileName);
  };

  render() {
    return (
      <div className={styles.postContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add Post</h2>

          <Uploader storeFilename={this.storeFilename} />

          <FormField
            id={'author'}
            formData={this.state.formData.author}
            change={elem => this.updateForm(elem)}
          />

          <FormField
            id={'title'}
            formData={this.state.formData.title}
            change={elem => this.updateForm(elem)}
          />

          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
          />

          <FormField
            id={'team'}
            formData={this.state.formData.team}
            change={elem => this.updateForm(elem)}
          />
          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default Dashboard;
