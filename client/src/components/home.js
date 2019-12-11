import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='jumbotron'>
      <div className='container'>
        <h1 className='display-3'>ReactTODO</h1>
        <p>Organize your tasks with ReactTODO!</p>
        <p>
          <Link to='/register'>
            <button className='btn btn-primary'>Get Started</button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
