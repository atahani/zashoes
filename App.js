import React from 'react';
import { Platform, StatusBar, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Provider } from 'react-redux';
import Reactotron from 'reactotron-react-native';
import { Root, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { configureStore, setAsCurrentStore } from './store';
import rootSaga from './sagas';
import RootNavigation from './navigation/RootNavigation';
import './ReactotronConfig';

const Container = styled.View `
  flex: 1;
  background-color: #fff;
`;

const StatusBarUnderlay = styled.View `
  height: 24;
  background-color: 'rgba(0,0,0,0.2)';
`;

export default class BasicApp extends React.Component {
  state = {
    isLoadingComplete: false,
    store: null,
  };

  _loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('./assets/images/kids.jpg'),
      require('./assets/images/men.jpg', require('./assets/images/women.jpg')),
    ]),
    Font.loadAsync([
      // to add expo Ionicons
      Ionicons.font,
      // fontello for for icons
      {
        'zashoes-fontello': require('./assets/fonts/icon.ttf'),
      }, {
        Roboto: require('native-base/Fonts/Roboto.ttf'),
      }, {
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      },
    ]),
  ]).then(async () => {
    if (process.env.NODE_ENV === 'development') {
      Reactotron.connect();
      AsyncStorage.clear();
    }
    const store = await configureStore();
    store.runSaga(rootSaga);
    setAsCurrentStore(store);
    this.setState({ store });
  });

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    /* eslint no-console: "off" */
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (<AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading} 
      />);
    }
    return (
      <Provider store={this.state.store}>
        <StyleProvider style={getTheme(material)}>
          <Root>
            <Container>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <StatusBarUnderlay />}
              <RootNavigation />
            </Container>
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}
