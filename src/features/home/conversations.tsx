import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationScreenProps, FlatList } from 'react-navigation';
import { fonts, colors } from '../../styles';
import styled from 'styled-components';
import { Paragraph } from '../../components/styles/text';
import { Root } from '../../Root';

interface Conversation {
  id: string;
  from: User;
  to: User;
}

interface User {
  id: string;
  username: string;
  publicKey: string;
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
  const { rootContext, setRootContext }: any = React.useContext(Root.Context);

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
              <Paragraph>
                {rootContext.auth.user.id === item.from.id
                  ? item.to.username
                  : item.from.username}
              </Paragraph>
            </TouchableOpacity>
          </ConversationItem>
        );
      }}
    />
  );
};

export default ConversationsView;
