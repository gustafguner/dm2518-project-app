import * as React from 'react';
import { View, Text } from 'react-native';
import { Container } from '../../components/Container';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import colors from '../../styles/colors';
import { getPrivateKey } from '../../auth/auth';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { fonts } from '../../styles';

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
    <Container>
      <Query<Response, Variables> query={PROFILE_QUERY}>
        {({ data, loading, error }) =>
          data && !loading && !error ? (
            <Text>{data.user.username}</Text>
          ) : (
            <Text>Loading...</Text>
          )
        }
      </Query>
    </Container>
  );
};

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerStyle: {
    height: 90,
    paddingBottom: 16,
    paddingTop: 16,
  },
  headerTitleStyle: {
    fontSize: 30,
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'left',
  },
};

export default ProfileScreen;
