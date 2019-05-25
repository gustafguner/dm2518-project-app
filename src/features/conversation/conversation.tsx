import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationScreenProps, FlatList } from 'react-navigation';
import { fonts, colors } from '../../styles';
import styled from 'styled-components';
import { Paragraph } from '../../components/styles/text';

interface Conversation {
  id: string;
  to: string;
  from: string;
  messages: Message[];
}

interface Message {
  body: string;
  author: string;
  timestamp: string;
}

const ConversationItem = styled(View)({
  justifyContent: 'center',
  background: colors.WHITE,
  alignSelf: 'flex-end',
  borderRadius: 20,
  padding: 16,
  marginBottom: 16,
  shadowColor: colors.BLACK,
  shadowOpacity: 0.08,
  shadowRadius: 10,
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
      data={conversation.messages}
      style={{ padding: 16 }}
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
