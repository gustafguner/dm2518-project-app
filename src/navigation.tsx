import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Profile: ProfileStack,
});

export default createAppContainer(TabNavigator);
