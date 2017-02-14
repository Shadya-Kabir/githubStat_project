import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchqueryitems: null,
    }
    this.changeState = this.changeState.bind(this)
  }
  changeState(state) {
    this.setState({
      searchqueryitems: state,
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          {React.cloneElement(this.props.children, { findMeInConsole: 'You found me!', searchquerythings: this.state.searchqueryitems, changeState: this.changeState })}
        </div>
      </div>
    );
  }
}

export default App;
