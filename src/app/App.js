import React, {Component} from 'react';
import { hot } from 'react-hot-loader/root'

import webpackLogo from '../assets/images/webpack-logo.jpg';

class App extends Component {
  render() {
    return (
      <div>
        <img src={webpackLogo}></img>
      </div>
    )
  }
}

export default hot(App)