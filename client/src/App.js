import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Todo from './components/todo';
import Error404 from './components/error404';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/todo' component={Todo} />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default App;
