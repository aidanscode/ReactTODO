import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Copyright from './copyright';
import { sendNotification } from '../util';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      didRegister: false,
      formInput: {}
    };
  }

  onChange = event => {
    let target = event.target;
    let formInput = { ...this.state.formInput };
    formInput[target.name] = target.value;

    this.setState({
      formInput
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch('/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.formInput)
    })
      .then(result => result.json())
      .then(response => {
        if (response.success) {
          sendNotification('success', response.message);

          this.props.onLogin(response.sessionKey);
          this.setState({ didRegister: true });
        } else {
          sendNotification('error', response.message);
        }
      });
  };

  render() {
    if (this.state.didRegister) {
      return <Redirect to='/' />;
    }
    return (
      <div className='text-center'>
        <form className='form-signin' onSubmit={e => this.handleSubmit(e)}>
          <h1 className='h3 mb-3 font-weight-normal'>Register</h1>

          <div className='form-group'>
            <label htmlFor='inputName' className='sr-only'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='inputName'
              className='form-control'
              placeholder='Name'
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='inputEmail' className='sr-only'>
              Email address
            </label>
            <input
              type='email'
              name='email'
              id='inputEmail'
              className='form-control'
              placeholder='Email address'
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='inputPassword' className='sr-only'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='inputPassword'
              className='form-control'
              placeholder='Password'
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='inputPassword' className='sr-only'>
              Password (Confirm)
            </label>
            <input
              type='password'
              name='passwordConfirm'
              id='inputPasswordConfirm'
              className='form-control'
              placeholder='Password (Confirm)'
              onChange={this.onChange}
            />
          </div>

          <button
            className='btn btn-lg btn-primary btn-block mt-4'
            type='submit'
          >
            Sign Up
          </button>

          <Link to='/login'>
            <small>Already have an account? Log in instead</small>
          </Link>
          <Copyright />
        </form>
      </div>
    );
  }
}

export default Register;
