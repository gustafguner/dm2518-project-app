import * as React from 'react';
import { View, Text } from 'react-native';

import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import colors from '../../styles/colors';

const ProfileScreen: NavigationScreenComponent<NavigationScreenProps> = () => (
  <View>
    <Text>Profile</Text>
  </View>
);

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerStyle: {
    backgroundColor: colors.HEADER,
  },
  headerTintColor: '#fff',
};

export default ProfileScreen;
