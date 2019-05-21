import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import HomeScreen from './src/screens/home';
import ProfileScreen from './src/screens/profile';

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

export default createAppContainer(AppNavigator);
