import * as React from 'react';
import { Button, View, Text } from 'react-native';

import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';
import colors from '../../styles/colors';
import styled from 'styled-components';
import { StandardButton } from '../../components/styles/buttons';
import { Title } from '../../components/styles/text';
import { Spacing } from '../../components/Spacing';

const Header = styled(View)({
  alignItems: 'center',
});

const Container = styled(View)({
  height: '100%',
  padding: 16,
  justifyContent: 'center',
  flexFlow: 'column',
});

const WelcomeScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => (
  <Container>
    <Header>
      <Title>Welcome</Title>
    </Header>

    <Spacing height={20} />

    <StandardButton
      title="Log in"
      onPress={() => {
        navigation.navigate('Login');
      }}
    />
    <Spacing height={10} />
    <StandardButton
      title="Sign up"
      onPress={() => {
        navigation.navigate('Signup');
      }}
    />
  </Container>
);

WelcomeScreen.navigationOptions = {
  header: null,
  cardStyle: {
    background: 'red',
  },
};

export default WelcomeScreen;
