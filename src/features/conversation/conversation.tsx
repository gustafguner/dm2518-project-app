import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationScreenProps, FlatList } from 'react-navigation';
import { fonts, colors } from '../../styles';
import styled from 'styled-components';
import { Paragraph } from '../../components/styles/text';

interface Conversation {
  id: string;
  to: User;
  from: User;
  messages: Message[];
}

interface User {
  username: string;
  publicKey: string;
}

interface Message {
  body: string;
  author: User;
  timestamp: string;
}

const ConversationItem = styled(View)({
  justifyContent: 'center',
  background: colors.WHITE,
  alignSelf: 'flex-end',
  borderRadius: 50,
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 16,
  paddingRight: 16,
  marginBottom: 9,
});

interface Props {
  conversation: Conversation;
  subscribeToNewMessages: () => void;
}

const ConversationView: React.FC<Props> = ({
  conversation,
  subscribeToNewMessages,
}) => {
  console.log(conversation);
  React.useEffect(() => {
    subscribeToNewMessages();
  }, []);

  return (
    <FlatList<Message>
      inverted={true}
      data={conversation.messages}
      style={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      initialNumToRender={conversation.messages.length}
      keyExtractor={(item) => item.timestamp}
      renderItem={({ item }) => {
        return (
          <ConversationItem>
            <Paragraph>{item.body}</Paragraph>
          </ConversationItem>
        );
      }}
    />
  );
};

export default ConversationView;
