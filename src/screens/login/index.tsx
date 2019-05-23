import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components';

const Container = styled(View)({
  padding: 20,
});

const Header = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
});

const Input = styled(TextInput)({
  height: 40,
  borderWidth: 1,
});

const Form = styled(View)({
  flexFlow: 'column',
});

const LoginScreen: NavigationScreenComponent<NavigationScreenProps> = () => (
  <Container>
    <Header>
      <Text>Please log in</Text>
    </Header>
    <Form>
      <Text>Username</Text>
      <Input />
      <Text>Password</Text>
      <Input />

      <Button
        title="Login"
        onPress={() => {
          Alert.alert('Logga in');
        }}
      />
    </Form>
  </Container>
);

LoginScreen.navigationOptions = {
  title: 'Log in',
};

export default LoginScreen;
