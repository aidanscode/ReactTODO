import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  let { loginSession } = props;
  let pages = [
    { link: '/', text: 'Home' },
    { link: '/todo', text: 'My TODO List' }
  ];

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <Link to='/' className='navbar-brand'>
        ReactTODO
      </Link>

      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarsExampleDefault'
        aria-controls='navbarsExampleDefault'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarsExampleDefault'>
        <ul className='navbar-nav mr-auto'>
          {pages.map(p => {
            return (
              <li key={p.link} className='nav-item'>
                <Link to={p.link} className='nav-link'>
                  {p.text}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className='navbar-nav'>
          { loginSession.isLoggedIn ? (
            <li className='nav-item'>
              <Link to='/logout' className='nav-link'>
                Log Out
              </Link>
            </li>
          ) : (
            <React.Fragment>
              <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                  Log In
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/register' className='nav-link'>
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
