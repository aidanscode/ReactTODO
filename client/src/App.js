import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Todo from './components/todo';
import Login from './components/login';
import Register from './components/register';
import Error404 from './components/error404';

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

  render() {
    let { loginSession } = this.state;
    return (
      <Router>
        <Navbar isLoggedIn={loginSession.isLoggedIn} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/todo' component={Todo} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
