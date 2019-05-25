import * as React from 'react';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import Conversation from '../../features/conversation';

const ConversationScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => <Conversation navigation={navigation} />;

ConversationScreen.navigationOptions = {
  title: 'Conversation',
};

export default ConversationScreen;
