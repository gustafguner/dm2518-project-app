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
  query User($username: String) {
    user(username: $username) {
      username
      publicKey
    }
  }
`;

interface User {
  username: string;
  publicKey: string;
}

interface Response {
  user: User;
}

interface Variables {
  username?: string;
}

const ProfileScreen: NavigationScreenComponent<NavigationScreenProps> = () => {
  return (
    <View>
      <Query<Response, Variables> query={PROFILE_QUERY}>
        {({ data, loading, error }) =>
          data && !loading && !error ? (
            <Text>{data.user.username}</Text>
          ) : (
            <Text>Loading...</Text>
          )
        }
      </Query>
    </View>
  );
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
