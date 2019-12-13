import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      didLogout: false
    };
  }

  componentDidMount() {
    this.props.handleLogout(success => {
      this.setState({ didLogout: success });
    });
  }

  render() {
    if (this.state.didLogout) {
      return <Redirect to='/' />;
    }

    return (
      <div className='text-center'>
        <h1>Logging out...</h1>
      </div>
    );
  }
}

export default Logout;
