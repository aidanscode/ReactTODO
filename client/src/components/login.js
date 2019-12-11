import React from 'react';
import { Link } from 'react-router-dom';
import Copyright from './copyright';

function Login() {
  return (
  	<div className="text-center">
	    <form className="form-signin">
	      <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>

	      <label htmlFor="inputEmail" className="sr-only">Email address</label>
	      <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />

	      <label htmlFor="inputPassword" className="sr-only">Password</label>
	      <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />

	      <div className="checkbox mb-3">
	        <label>
	          <input type="checkbox" value="remember-me" />Remember Me
	        </label>
	      </div>

	      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>

	      <Link to='/register'><small>Don't have an account? Register today!</small></Link>
	      <Copyright />
	    </form>
    </div>
  );
}

export default Login;
