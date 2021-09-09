import React, { Component } from 'react';
import { AppRegistry, View, AsyncStorage, Alert, BackHandler } from 'react-native';
import Routes from './src/routes';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes />
    )
  }
}
