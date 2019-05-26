import * as React from 'react';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import { fonts, colors } from '../../styles';
import Home from '../../features/home';

const HomeScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => <Home navigation={navigation} />;

HomeScreen.navigationOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'normal',
  },
};

export default HomeScreen;
