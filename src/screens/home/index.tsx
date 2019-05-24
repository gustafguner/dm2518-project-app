import * as React from 'react';
import gql from 'graphql-tag';
import { View, Text, Button } from 'react-native';
import { Query } from 'react-apollo';
import { Container } from '../../components/Container';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';

import {
  generateKeyPair,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from '../../crypto';
import colors from '../../styles/colors';
import { fonts } from '../../styles';

const QUERY = gql`
  query User {
    user {
      username
      publicKey
    }
  }
`;

const test = async () => {
  const keyPair = await generateKeyPair();

  if (keyPair !== false) {
    const message = 'Lorem ipsum';
    const encryptedMessage = await encryptWithPublicKey(
      message,
      keyPair.publicKey,
    );

    const decryptedMessage = await decryptWithPrivateKey(
      encryptedMessage,
      keyPair.privateKey,
    );
    console.log(decryptedMessage);
  }
};

const HomeScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  test();
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
};

HomeScreen.navigationOptions = {
  title: 'Home',
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

export default HomeScreen;
