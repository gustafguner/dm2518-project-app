import * as React from 'react';
import { View, TouchableOpacity, NativeModules, Platform } from 'react-native';
import { NavigationScreenProps, FlatList } from 'react-navigation';
import { fonts, colors } from '../../styles';
import styled from 'styled-components';
import { Paragraph } from '../../components/styles/text';
import to from 'await-to-js';
var Aes = NativeModules.Aes;

interface Conversation {
  id: string;
  to: User;
  from: User;
  messages: Message[];
  fromKey: string;
  toKey: string;
  iv: string;
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
  symmetricKey: any;
  subscribeToNewMessages: () => void;
}

const decryptBody = (encrypedBody: string, key: string, iv: string) =>
  Aes.decrypt(encrypedBody, key, iv).then((text: string) => text);

const ConversationView: React.FC<Props> = ({
  conversation,
  symmetricKey,
  subscribeToNewMessages,
}) => {
  const [decryptedMessages, setDecryptedMessages]: any = React.useState(
    conversation.messages,
  );

  React.useEffect(() => {
    subscribeToNewMessages();
  }, []);

  React.useEffect(() => {
    if (!symmetricKey) return;

    const decrypted = conversation.messages.map(async (message: any) => {
      if (message.decrypted === true) return message;
      const [err, res] = await to(
        decryptBody(message.body, symmetricKey, conversation.iv),
      );
      return { ...message, body: res, decrypted: true };
    });

    Promise.all(decrypted).then((messages: any) => {
      setDecryptedMessages(messages);
    });
  }, [symmetricKey, conversation.messages]);

  return (
    <FlatList<Message>
      inverted={true}
      data={decryptedMessages}
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
