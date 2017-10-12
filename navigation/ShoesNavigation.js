import { StackNavigator } from 'react-navigation';
import ZashoesScreen from '../screens/ZashoesScreen';
import ShoesListByCategoryScreen from '../screens/ShoesListByCategoryScreen';
import ShoesItemScreen from '../screens/ShoesItemScreen';

export default StackNavigator({
  Shoes: {
    screen: ZashoesScreen,
    path: '/',
    header: null,
  },
  ShoesList: {
    screen: ShoesListByCategoryScreen,
    path: '/shoes/category/:category',
  },
  ShoesItem: {
    screen: ShoesItemScreen,
    path: '/shoes/:id',
  },
});
