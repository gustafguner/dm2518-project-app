import * as React from 'react';
import { View, Text, Button, Clipboard } from 'react-native';
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
import { signOut, getPrivateKey } from '../../auth/auth';
import { StandardButton } from '../../components/styles/buttons';

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
    <Query<Response, Variables>
      query={PROFILE_QUERY}
      fetchPolicy={'network-only'}
    >
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

            <Spacing height={30} />

            <Title>Private key</Title>
            <Spacing height={10} />
            <StandardButton
              title="Copy to clipboard"
              onPress={async () => {
                const privateKey = await getPrivateKey();
                if (privateKey) {
                  Clipboard.setString(privateKey);
                }
              }}
            />

            <Spacing height={50} />
            <StandardButton
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
  headerTitleStyle: {
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'normal',
  },
};

export default ProfileScreen;
