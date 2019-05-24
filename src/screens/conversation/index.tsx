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
import { fonts } from '../../styles';
import styled from 'styled-components';

const ConversationScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  return (
    <ScrollView>
      <Text>Convo</Text>
    </ScrollView>
  );
};

ConversationScreen.navigationOptions = {
  title: 'Conversation',
};

export default ConversationScreen;
