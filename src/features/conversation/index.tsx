import React from 'react';
import gql from 'graphql-tag';
import {
  Button,
  TouchableOpacity,
  View,
  TextInput,
  NativeModules,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Paragraph } from '../../components/styles/text';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import { colors } from '../../styles';
import ConversationView from './conversation';
import ChatTextInput from './chat-text-input';
import { getUser } from '../../auth/auth';
import { encryptWithPublicKey, decryptWithPrivateKey } from '../../crypto';
import to from 'await-to-js';
var Aes = NativeModules.Aes;
import { Root, useRootContext } from '../../Root';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const CONVERSATION_QUERY = gql`
  query Conversation($conversationId: ID!) {
    conversation(conversationId: $conversationId) {
      id
      from {
        id
        username
        publicKey
      }
      to {
        id
        username
        publicKey
      }
      messages {
        body
        author {
          id
          username
        }
        timestamp
      }
      fromKey
      toKey
      iv
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription Message($conversationId: ID!) {
    message(conversationId: $conversationId) {
      body
      author {
        id
        username
      }
      timestamp
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input)
  }
`;

interface Conversation {
  id: string;
  from: User;
  to: User;
  messages: Message[];
}

interface User {
  id: string;
  username: string;
  publicKey: string;
}

interface Message {
  body: string;
  author: User;
  timestamp: string;
}

interface Response {
  conversation?: Conversation;
}

interface Variables {
  conversationId: string;
}

const encryptBody = async (text: string, keyBase64: string, iv: string) =>
  Aes.encrypt(text, keyBase64, iv).then((cipher: any) => cipher);

const decryptBody = (encrypedBody: string, key: string, iv: string) =>
  Aes.decrypt(encrypedBody, key, iv).then((text: string) => text);

const ChatWrapper = styled(View)({
  flex: 1,
});

const Conversation: React.FC<NavigationScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const conversationId: string = navigation.getParam('conversationId', null);
  const [conversation, setConversation]: any = React.useState(null);
  const [symmetricKey, setSymmetricKey]: any = React.useState(null);

  const { rootContext, setRootContext }: any = React.useContext(Root.Context);
  console.log(rootContext);

  React.useEffect(() => {
    const getKey = async () => {
      const encryptedKey =
        rootContext.auth.user.id === conversation.from.id
          ? conversation.fromKey
          : conversation.toKey;

      const key = await decryptWithPrivateKey(encryptedKey);

      if (!key) return;

      setSymmetricKey(key);
    };

    if (conversation && symmetricKey === null) {
      getKey();
    }
  }, [conversation]);

  return (
    <>
      <ChatWrapper>
        <Query<Response, Variables>
          query={CONVERSATION_QUERY}
          fetchPolicy={'network-only'}
          variables={{ conversationId }}
        >
          {({ data, loading, error, subscribeToMore }) => {
            if (data && data.conversation) {
              setConversation(data.conversation);
            }
            return data && data.conversation && !loading && !error ? (
              <ConversationView
                conversation={data.conversation}
                symmetricKey={symmetricKey}
                subscribeToNewMessages={() => {
                  subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: { conversationId },
                    updateQuery: (prev, { subscriptionData }) => {
                      console.log(subscriptionData);
                      if (!subscriptionData.data) return prev;

                      const newMessage = subscriptionData.data.message;

                      return Object.assign({}, prev, {
                        conversation: {
                          ...prev.conversation,
                          messages: [newMessage, ...prev.conversation.messages],
                        },
                      });
                    },
                  });
                }}
              />
            ) : (
              <Paragraph>Loading...</Paragraph>
            );
          }}
        </Query>
      </ChatWrapper>

      <Mutation mutation={SEND_MESSAGE_MUTATION}>
        {(mutate: any) => (
          <ChatTextInput
            sendMessage={async (body: string) => {
              const [encryptErr, encryptedBody] = await to(
                encryptBody(body, symmetricKey, conversation.iv),
              );
              const [decryptErr, decryptedBody] = await to(
                decryptBody(encryptedBody, symmetricKey, conversation.iv),
              );

              console.log('Encrypted', encryptedBody);
              console.log('Decrypted', decryptedBody);

              const res: any = await mutate({
                variables: {
                  input: {
                    body: encryptedBody,
                    conversationId,
                  },
                },
              });
              console.log(res);
            }}
          />
        )}
      </Mutation>
      <KeyboardSpacer />
    </>
  );
};

export default Conversation;
