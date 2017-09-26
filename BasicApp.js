import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import {AppLoading, Asset, Font} from 'expo';
import styled from 'styled-components/native';
import RootNavigation from './navigation/RootNavigation';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const StatusBarUnderlay = styled.View`
  height: 24;
  background-color: 'rgba(0,0,0,0.2)';
`;

export default class BasicApp extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (<AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}/>);
    } else {
      return (
        <Container>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          {Platform.OS === 'android' && <StatusBarUnderlay />}
          <RootNavigation/>
        </Container>
      );
    }
  }

  _loadResourcesAsync = async() => {
    return Promise.all([
      Asset.loadAsync([require('./assets/images/robot-dev.png'), require('./assets/images/robot-prod.png')]),
      Font.loadAsync([
        // fontello for for icons
        {
          'zashoes-fontello': require('./assets/fonts/icon.ttf')
        },
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to remove
        // this if you are not using it in your app
        {
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
        }
      ])
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}