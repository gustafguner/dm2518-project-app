import * as React from 'react';
import gql from 'graphql-tag';
import { Button, TouchableOpacity, View, TextInput } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Paragraph } from '../../components/styles/text';
import { Mutation, Query } from 'react-apollo';
import styled from 'styled-components';
import { colors } from '../../styles';
import ConversationView from './conversation';
import ChatTextInput from './chat-text-input';
import { getUser } from '../../auth/auth';
import { encryptWithPublicKey } from '../../crypto';

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
          username
        }
        timestamp
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription Message($conversationId: ID!) {
    message(conversationId: $conversationId) {
      body
      author {
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

const ChatWrapper = styled(View)({
  flex: 1,
});

const Conversation: React.FC<NavigationScreenProps> = ({ navigation }) => {
  // @ts-ignore
  const conversationId: string = navigation.getParam('conversationId', null);
  const [conversation, setConversation]: any = React.useState(null);

  return (
    <>
      <ChatWrapper>
        <Query<Response, Variables>
          query={CONVERSATION_QUERY}
          variables={{ conversationId }}
        >
          {({ data, loading, error, subscribeToMore }) => {
            console.log(data);
            if (data) setConversation(data.conversation);
            return data && data.conversation && !loading && !error ? (
              <ConversationView
                conversation={data.conversation}
                subscribeToNewMessages={() => {
                  subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: { conversationId },
                    updateQuery: (prev, { subscriptionData }) => {
                      console.log(subscriptionData);
                      if (!subscriptionData.data) return prev;

                      const newMessage = subscriptionData.data.message;

                      console.log({
                        conversation: {
                          ...prev.conversation,
                          messages: [...prev.conversation.messages, newMessage],
                        },
                      });

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
              const me = await getUser();
              const key =
                me.id === conversation.from.id
                  ? conversation.to.publicKey
                  : conversation.from.publicKey;
              const encryptedBody = await encryptWithPublicKey(body, key);

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
    </>
  );
};

export default Conversation;
