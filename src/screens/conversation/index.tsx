import * as React from 'react';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import Conversation from '../../features/conversation';
import { fonts } from '../../styles';

const ConversationScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => <Conversation navigation={navigation} />;

ConversationScreen.navigationOptions = {
  title: 'Conversation',
  headerTitleStyle: {
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'normal',
  },
};

export default ConversationScreen;
