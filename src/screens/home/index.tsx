import * as React from 'react';
import gql from 'graphql-tag';
import {
  Alert,
  View,
  Text,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
  ScrollView,
  FlatList,
} from 'react-navigation';

import {
  generateKeyPair,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from '../../crypto';
import { fonts, colors } from '../../styles';
import styled from 'styled-components';
import { CreateConversationModal } from './create-conversation';
import { Paragraph } from '../../components/styles/text';
import { Query } from 'react-apollo';

const CONVERSATIONS_QUERY = gql`
  query Conversations {
    conversations {
      id
      from
      to
    }
  }
`;

interface Conversation {
  id: string;
  to: string;
  from: string;
}

interface Response {
  conversations?: [Conversation];
}

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
  const [createModalVisible, setCreateModalVisible] = React.useState(false);

  test();
  return (
    <>
      <Button
        title="Create conversation"
        onPress={() => {
          setCreateModalVisible(true);
        }}
      />
      <ScrollView>
        <Query<Response, {}> query={CONVERSATIONS_QUERY}>
          {({ data, loading, error }) => {
            console.log(data);
            return data && data.conversations && !loading && !error ? (
              <FlatList<Conversation>
                data={data.conversations}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Conversation', {
                        conversationId: item.id,
                      });
                    }}
                  >
                    <Paragraph>{item.to}</Paragraph>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Paragraph>Loading...</Paragraph>
            );
          }}
        </Query>
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
