import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { Container } from '../../components/Container';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
  ScrollView,
} from 'react-navigation';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { fonts } from '../../styles';
import { Paragraph, SmallParagraph, Title } from '../../components/styles/text';
import { Spacing } from '../../components/Spacing';
import { signOut } from '../../auth/auth';

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

const ProfileScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  return (
    <Query<Response, Variables> query={PROFILE_QUERY}>
      {({ data, loading, error }) =>
        data && !loading && !error ? (
          <ScrollView style={{ padding: 16 }}>
            <Title>Username</Title>
            <Spacing height={10} />
            <Paragraph>{data.user.username}</Paragraph>

            <Spacing height={30} />

            <Title>Public key</Title>
            <Spacing height={10} />
            <SmallParagraph>{data.user.publicKey}</SmallParagraph>

            <Spacing height={20} />
            <Button
              title="Log out"
              onPress={async () => {
                await signOut();
                navigation.navigate('Welcome');
              }}
            />
          </ScrollView>
        ) : (
          <Text>Loading...</Text>
        )
      }
    </Query>
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
