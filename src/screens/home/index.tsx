import * as React from 'react';
import gql from 'graphql-tag';
import { View, Text, Button } from 'react-native';
import { Query } from 'react-apollo';

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
    <View>
      <Text>Home</Text>
      <Button
        onPress={() => {
          navigation.navigate('Profile');
        }}
        title="Go to Profile"
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: 'Home',
  headerStyle: {
    backgroundColor: colors.HEADER,
  },
  headerTintColor: '#fff',
};

export default HomeScreen;
