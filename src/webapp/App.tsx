import React, { Component } from 'react';
import axios from 'axios';

import API from './api';

class App extends Component {
  state = {
    data: null
  }

  componentDidMount = () => {
    API.get('/user/login')
      .then(res => { 
        this.setState({data: res.data})
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p></p>
          <p>
            Hi <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
