import * as React from 'react';
import gql from 'graphql-tag';
import { Button, TouchableOpacity, View, NativeModules } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { CreateConversationModal } from './create-conversation-modal';
import { Paragraph } from '../../components/styles/text';
import { Query } from 'react-apollo';
import ConversationsView from './conversations';
import styled from 'styled-components';
import { colors } from '../../styles';
import { signOut } from '../../auth/auth';

const CONVERSATIONS_QUERY = gql`
  query Conversations {
    conversations {
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
    }
  }
`;

const CONVERSATION_SUBSCRIPTION = gql`
  subscription Converation {
    conversation {
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
    }
  }
`;

const StartConversation = styled(View)({
  padding: 16,
});

const StartConversationButton = styled(TouchableOpacity)({
  textAlign: 'center',
  background: colors.PRIMARY,
  justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  borderRadius: 8,
});

const StartConversationText = styled(Paragraph)({
  color: colors.WHITE,
  fontSize: 18,
});

interface Conversation {
  id: string;
  to: User;
  from: User;
}

interface User {
  id: string;
  username: string;
  publicKey: string;
}

interface Response {
  conversations?: [Conversation];
  conversation?: Conversation;
}

const Home: React.FC<NavigationScreenProps> = ({ navigation }) => {
  const [createModalVisible, setCreateModalVisible] = React.useState(false);
  return (
    <>
      <StartConversation>
        <StartConversationButton
          onPress={() => {
            setCreateModalVisible(true);
          }}
        >
          <StartConversationText>Start a conversation 🕵</StartConversationText>
        </StartConversationButton>
      </StartConversation>

      <Query<Response, {}>
        query={CONVERSATIONS_QUERY}
        fetchPolicy={'network-only'}
      >
        {({ data, loading, error, subscribeToMore }) => {
          return data && data.conversations && !loading && !error ? (
            <ConversationsView
              navigation={navigation}
              conversations={data.conversations}
              subscribeToNewConversations={() => {
                subscribeToMore({
                  document: CONVERSATION_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    console.log(subscriptionData);
                    if (!subscriptionData.data) return prev;
                    const newConversation = subscriptionData.data.conversation;

                    console.log([newConversation, ...prev.conversations]);

                    return Object.assign({}, prev, {
                      conversations: [...prev.conversations, newConversation],
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

      <CreateConversationModal
        visible={createModalVisible}
        onClose={() => {
          setCreateModalVisible(false);
        }}
      />
    </>
  );
};

export default Home;
