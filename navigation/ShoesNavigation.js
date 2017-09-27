import { StackNavigator } from 'react-navigation';
import ZashoesScreen from '../screens/ZashoesScreen';
import ShoesListByCategoryScreen from '../screens/ShoesListByCategoryScreen';

export default StackNavigator({
  Shoes: {
    screen: ZashoesScreen,
    path: '/',
    header: null,
  },
  ShoesList: {
    screen: ShoesListByCategoryScreen,
    path: '/shoes/:type/:category',
    navigationOptions: ({ navigation }) => {
      const type = navigation.state.params.type;
      return ({
        headerTitle: `${type
          .substr(0, 1)
          .toUpperCase() + type.substr(1)}'s Shoes`,
      });
    },
  },
});
