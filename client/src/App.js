import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Todo from './components/todo';
import Login from './components/login';
import Register from './components/register';
import Logout from './components/logout';
import Error404 from './components/error404';
import Notifications from 'react-notify-toast';
import { initializeLoginSession, endSession } from './util';

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

  componentDidMount() {
    initializeLoginSession(loginSession => {
      this.setState({ loginSession: loginSession });
    });
  }

  handleLogIn = sessionKey => {
    localStorage.setItem('session-key', sessionKey);

    let loginSession = {
      isLoggedIn: true,
      session: sessionKey
    };
    this.setState({ loginSession });
  };

  handleLogOut = callback => {
    endSession(success => {
      if (success) {
        localStorage.removeItem('session-key');

        let loginSession = { isLoggedIn: false, session: null };
        this.setState({ loginSession }, () => {
          callback(success);
        });
      }
    });
  };

  render() {
    let { loginSession } = this.state;
    return (
      <React.Fragment>
        <Notifications />
        <Router>
          <Navbar isLoggedIn={loginSession.isLoggedIn} />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route
              path='/todo'
              render={props => (
                <Todo {...props} sessionKey={loginSession.session} />
              )}
            />
            <Route
              path='/login'
              render={props => <Login {...props} onLogin={this.handleLogIn} />}
            />
            <Route
              path='/register'
              render={props => (
                <Register {...props} onLogin={this.handleLogIn} />
              )}
            />
            <Route
              path='/logout'
              render={props => (
                <Logout {...props} handleLogout={this.handleLogOut} />
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
