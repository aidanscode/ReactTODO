import React from 'react';
import { Link } from 'react-router-dom';
import Copyright from './copyright';

function Register() {
  return (
  	<div className="text-center">
	    <form className="form-signin">
	      <h1 className="h3 mb-3 font-weight-normal">Register</h1>

	      <div className="form-group">
		      <label htmlFor="inputName" className="sr-only">Name</label>
		      <input type="text" name="name" id="inputName" className="form-control" placeholder="Name" required />
	      </div>

		    <div className="form-group">
  	      <label htmlFor="inputEmail" className="sr-only">Email address</label>
  	      <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required />
        </div>

        <div className="form-group">
  	      <label htmlFor="inputPassword" className="sr-only">Password</label>
  	      <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
        </div>

        <div className="form-group">  
  	      <label htmlFor="inputPassword" className="sr-only">Password (Confirm)</label>
  	      <input type="password" name="passwordConfirm" id="inputPasswordConfirm" className="form-control" placeholder="Password (Confirm)" required />
        </div>

	      <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Sign in</button>
        
	      <Link to='/login'><small>Already have an account? Log in instead</small></Link>
	      <Copyright />
	    </form>
    </div>
  );
}

export default Register;
