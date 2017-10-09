import React from 'react';
import { Notifications } from 'expo';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    if (this._notificationSubscription) {
      this._notificationSubscription = this
        ._notificationSubscription
        .remove();
    }
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications You
    // can comment the following line out if you want to stop receiving a
    // notification every time you open the app. Check out the source for this
    // function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  /* eslint no-console: "off"*/
  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };

  render() {
    return <MainTabNavigator />;
  }
}
