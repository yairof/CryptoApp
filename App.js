import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import { Header, CryptoContainer } from './src/components';
import Store from './src/Store';

export default class App extends Component {
  render() {
    return (
    <Provider store = {Store}>
      <View>
        <Header />
        <CryptoContainer />
      </View>
    </Provider>
    );
  }
}
