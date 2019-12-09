import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
      </div>
    </nav>
  );
}

export default Navbar;
