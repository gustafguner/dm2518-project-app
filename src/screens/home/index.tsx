import * as React from 'react';
import gql from 'graphql-tag';
import { View, Text, Button } from 'react-native';
import { Query } from 'react-apollo';

import {
  generateKeyPair,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from '../../crypto';

const QUERY = gql`
  query User {
    user {
      username
      publicKey
    }
  }
`;

interface Props {
  navigation: any;
}

const test = async () => {
  const keyPair = await generateKeyPair();
  console.log(keyPair);

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

const HomeScreen: React.FC<Props> = ({ navigation }) => {
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

export default HomeScreen;
