import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../icon_font_config.json';
import Colors from '../constants/Colors';
import ShoesNavigation from './ShoesNavigation';
import MyBagScreen from '../screens/MyBagScreen';
import MyAccountScreen from '../screens/MyAccountScreen';

// using fontello font icon
// NOTE: should using from 'Font.loadAsync' in App.js to load icon.ttf file
const Icon = createIconSetFromFontello(fontelloConfig, 'zashoes-fontello');

export default TabNavigator({
  Shoes: {
    screen: ShoesNavigation,
  },
  MyBag: {
    screen: MyBagScreen,
  },
  MyAccount: {
    screen: MyAccountScreen,
  },
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Shoes':
          iconName = 'zashoes';
          break;
        case 'MyBag':
          iconName = 'shopping-bag';
          break;
        case 'MyAccount':
          iconName = Platform.OS === 'ios'
            ? `user-circle${focused
              ? ''
              : '-outline'}`
            : 'user-circle';
          break;
        default:
          break;
      }
      return (<Icon
        name={iconName}
        size={24}
        color={focused
          ? Colors.tabIconSelected
          : Colors.tabIconDefault} 
      />);
    },
  }),
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#ffffff',
    },
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});
