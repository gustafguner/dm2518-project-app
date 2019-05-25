import * as React from 'react';
import gql from 'graphql-tag';
import {
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { NavigationScreenProps, FlatList } from 'react-navigation';

import {
  generateKeyPair,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from '../../crypto';
import { fonts, colors } from '../../styles';
import styled from 'styled-components';
import { CreateConversationModal } from './create-conversation-modal';
import { Paragraph } from '../../components/styles/text';
import { Query } from 'react-apollo';

interface Conversation {
  id: string;
  to: string;
  from: string;
}

const ConversationItem = styled(View)({
  justifyContent: 'center',
  background: colors.WHITE,
  height: 80,
  borderRadius: 8,
  padding: 20,
  marginBottom: 16,
  shadowColor: colors.BLACK,
  shadowOpacity: 0.08,
  shadowRadius: 10,
});

interface Props {
  conversations: [Conversation];
  subscribeToNewConversations: () => void;
}

const ConversationsView: React.FC<NavigationScreenProps & Props> = ({
  conversations,
  navigation,
  subscribeToNewConversations,
}) => {
  console.log(conversations);
  React.useEffect(() => {
    subscribeToNewConversations();
  }, []);

  return (
    <FlatList<Conversation>
      data={conversations}
      style={{ padding: 16 }}
      initialNumToRender={conversations.length}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        console.log('Item', item);
        return (
          <ConversationItem>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Conversation', {
                  conversationId: item.id,
                });
              }}
            >
              <Paragraph>{item.to}</Paragraph>
            </TouchableOpacity>
          </ConversationItem>
        );
      }}
    />
  );
};

export default ConversationsView;
