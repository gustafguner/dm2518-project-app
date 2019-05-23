import * as React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import styled from 'styled-components';
import { View } from 'react-native';

const TabBarIcon = styled(View)`
  width: 20px;
  height: 20px;
  background: red;
`;

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

const SignedIn = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        // You can return any component that you like here!
        return <TabBarIcon />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

export default SignedIn;
