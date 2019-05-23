import * as React from 'react';
import { View, Text } from 'react-native';

import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import colors from '../../styles/colors';
import { getPrivateKey } from '../../auth/auth';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const PROFILE_QUERY = gql`
  query User($input: FindUserInput!) {
    user(input: $input) {
      publicKey
    }
  }
`;

const ProfileScreen: NavigationScreenComponent<NavigationScreenProps> = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Query
        query={PROFILE_QUERY}
        variables={{ input: { username: 'gustaf' } }}
      >
        {({ data, loading, err }) => {
          console.log(data);
          return null;
        }}
      </Query>
    </View>
  );
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
