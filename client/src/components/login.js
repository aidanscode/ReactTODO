import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Copyright from './copyright';
import { sendNotification } from '../util';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      didLogin: false,
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

    fetch('/api/v1/login', {
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
          this.setState({ didLogin: true });
        } else {
          sendNotification('error', response.message);
        }
      });
  };

  render() {
    if (this.state.didLogin) {
      return <Redirect to='/' />;
    }

    return (
      <div className='text-center'>
        <form className='form-signin' onSubmit={e => this.handleSubmit(e)}>
          <h1 className='h3 mb-3 font-weight-normal'>Sign In</h1>

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
            required
          />

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
            required
          />

          <div className='checkbox mb-3'>
            <label>
              <input type='checkbox' value='remember-me' />
              Remember Me
            </label>
          </div>

          <button className='btn btn-lg btn-primary btn-block' type='submit'>
            Sign In
          </button>

          <Link to='/register'>
            <small>Don't have an account? Register today!</small>
          </Link>
          <Copyright />
        </form>
      </div>
    );
  }
}

export default Login;
