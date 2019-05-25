import * as React from 'react';
import gql from 'graphql-tag';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import { Container } from '../../components/Container';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
  ScrollView,
} from 'react-navigation';
import { Query } from 'react-apollo';

const CONVERSATION_QUERY = gql`
  query Conversation($conversationId: ID!) {
    conversation(conversationId: $conversationId) {
      id
      from
      to
    }
  }
`;

interface Conversation {
  id: string;
  from: string;
  to: string;
}

interface Response {
  conversation?: Conversation;
}

interface Variables {
  conversationId: string;
}

const ConversationScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  // @ts-ignore
  const conversationId: string = navigation.getParam('conversationId', null);
  return (
    <Query<Response, Variables>
      query={CONVERSATION_QUERY}
      variables={{ conversationId }}
    >
      {({ data, loading, error }) => {
        console.log(data);

        return data && !loading && !error ? (
          <Text>Got it</Text>
        ) : (
          <Text>Loading...</Text>
        );
      }}
    </Query>
  );
};

ConversationScreen.navigationOptions = {
  title: 'Conversation',
};

export default ConversationScreen;
