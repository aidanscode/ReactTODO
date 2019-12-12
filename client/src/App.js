import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Todo from './components/todo';
import Login from './components/login';
import Register from './components/register';
import Error404 from './components/error404';
import Notifications from 'react-notify-toast';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loginSession: {
        isLoggedIn: false,
        session: null
      }
    };
  }

  handleLogIn = sessionKey => {
    localStorage.setItem('session-key', sessionKey);

    let loginSession = {
      isLoggedIn: true,
      session: sessionKey
    };
    this.setState({ loginSession });
  };

  handleLogOut() {
    localStorage.remoteItem('session-key');

    let loginSession = { isLoggedIn: false, session: null };
    this.setState({ loginSession });
  }

  render() {
    let { loginSession } = this.state;
    return (
      <React.Fragment>
        <Notifications />
        <Router>
          <Navbar isLoggedIn={loginSession.isLoggedIn} />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/todo' component={Todo} />
            <Route path='/login' component={Login} />
            <Route
              path='/register'
              render={props => (
                <Register {...props} onLogin={this.handleLogIn} />
              )}
            />
            <Route component={Error404} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
