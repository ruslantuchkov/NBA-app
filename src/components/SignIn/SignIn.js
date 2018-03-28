import React, { Component } from 'react';
import { firebase } from '../../firebase';
import styles from './signIn.css';
import FormField from '../widgets/FormFields/FormFields';

class SignIn extends Component {
  state = {
    registerError: '',
    loading: false,
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'enter your password'
        },
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = elem => {
    const newFormData = {
      ...this.state.formData
    };
    const newElement = {
      ...newFormData[elem.id]
    };

    newElement.value = elem.event.target.value;

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

  submitForm = (event, type) => {
    event.preventDefault();

    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
      }

      for (let key in this.state.formData) {
        formIsValid = this.state.formData[key].valid && formIsValid;
      }

      if (formIsValid) {
        this.setState({ loading: true, registerError: '' });
        if (type) {
          firebase
            .auth()
            .signInWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => this.props.history.push('/'))
            .catch(err =>
              this.setState({ loading: false, registerError: err.message })
            );
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => this.props.history.push('/'))
            .catch(err =>
              this.setState({ loading: false, registerError: err.message })
            );
        }
      }
    }
  };

  submitButton = () =>
    this.state.loading ? (
      '...loading'
    ) : (
      <div>
        <button onClick={event => this.submitForm(event, false)}>
          Register now
        </button>
        <button onClick={event => this.submitForm(event, true)}>Log in</button>
      </div>
    );

  showError = () =>
    this.state.registerError !== '' ? (
      <div className={styles.error}>{this.state.registerError}</div>
    ) : (
      ''
    );

  render() {
    return (
      <div className={styles.logContainer}>
        <form onSubmit={event => this.submitForm(event, null)}>
          <h2>Register / Log In</h2>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={elem => this.updateForm(elem)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={elem => this.updateForm(elem)}
          />
          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default SignIn;
