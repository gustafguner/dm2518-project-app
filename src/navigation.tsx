import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
});

export default createAppContainer(TabNavigator);
