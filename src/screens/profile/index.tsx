import * as React from 'react';
import { View, Text } from 'react-native';

import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import colors from '../../styles/colors';
import { getPrivateKey } from '../../auth/auth';

const ProfileScreen: NavigationScreenComponent<NavigationScreenProps> = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerStyle: {
    backgroundColor: colors.HEADER,
  },
};

export default ProfileScreen;
