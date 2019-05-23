import * as React from 'react';
import { Button, View, Text } from 'react-native';

import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import colors from '../../styles/colors';
import styled from 'styled-components';

const Container = styled(View)({
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexFlow: 'column',
});

const WelcomeScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => (
  <Container>
    <Text>Welcome</Text>
    <Button
      title="Log in"
      onPress={() => {
        navigation.navigate('Login');
      }}
    />
    <Button
      title="Sign up"
      onPress={() => {
        navigation.navigate('Signup');
      }}
    />
  </Container>
);

WelcomeScreen.navigationOptions = {
  header: null,
};

export default WelcomeScreen;
