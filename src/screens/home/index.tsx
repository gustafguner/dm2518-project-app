import * as React from 'react';
import gql from 'graphql-tag';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { Container } from '../../components/Container';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
  ScrollView,
} from 'react-navigation';

import {
  generateKeyPair,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from '../../crypto';
import { fonts, colors } from '../../styles';
import styled from 'styled-components';
import { CreateConversationModal } from './create-conversation';

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
  const [createModalVisible, setCreateModalVisible] = React.useState(true);

  test();
  return (
    <>
      <ScrollView>
        <Text>Home</Text>
        <Button
          title="Go to convo"
          onPress={() => {
            navigation.navigate('Conversation');
          }}
        />
      </ScrollView>
      <CreateConversationModal
        visible={createModalVisible}
        onClose={() => {
          setCreateModalVisible(false);
        }}
      />
    </>
  );
};

HomeScreen.navigationOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'normal',
  },
};

export default HomeScreen;
