import React from 'react';
import {Platform} from 'react-native';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../icon_font_config.json';
import Colors from '../constants/Colors';
import { ZashoesScreen } from '../screens';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';


// using fontello font icon 
// NOTE: should using from 'Font.loadAsync' in App.js to load icon.ttf file
const Icon = createIconSetFromFontello(fontelloConfig, 'zashoes-fontello');

export default TabNavigator({
  shoes: {
    screen: ZashoesScreen
  },
  search: {
    screen: HomeScreen
  },
  mybag: {
    screen: LinksScreen
  },
  myaccount: {
    screen: SettingsScreen
  }
}, {
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;
      let iconName;
      switch (routeName) {
        case 'shoes':
          iconName = 'zashoes'
          break;
        case 'search':
          iconName = 'search'
          break;
        case 'mybag':
          iconName = 'shopping-bag'
          break;
        case 'myaccount':
        iconName = Platform.OS === 'ios'
        ? `user-circle${focused
          ? ''
          : '-outline'}`
        : 'user-circle';
      }
      return (<Icon
        name={iconName}
        size={24}
        color={focused
        ? Colors.tabIconSelected
        : Colors.tabIconDefault}/>);
    }
  }),
  tabBarOptions:{
    showLabel: false,
    style:{
      backgroundColor: '#ffffff',
    },
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: true,
});
