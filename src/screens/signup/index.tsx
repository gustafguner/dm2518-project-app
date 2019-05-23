import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';
import { Formik, FormikProps, FormikActions } from 'formik';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { generateKeyPair } from '../../crypto';
import { setPrivateKey } from '../../auth/auth';

const SIGN_UP_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      publicKey
    }
  }
`;

interface FormValues {
  email: string;
  password: string;
}

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

const Form = styled(Formik)({
  flexFlow: 'column',
});

const SignupScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => (
  <Container>
    <Header>
      <Text>Please sign up</Text>
    </Header>
    <Mutation mutation={SIGN_UP_MUTATION}>
      {(mutate) => (
        <Form
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const keyPair = await generateKeyPair();
            if (!keyPair) {
              return;
            }
            await setPrivateKey(keyPair.privateKey);

            const res: any = await mutate({
              variables: {
                input: {
                  username: values.username,
                  password: values.password,
                  publicKey: keyPair.publicKey,
                },
              },
            });

            if (res.data.createUser !== null) {
              navigation.navigate('SignedIn');
            } else {
              Alert.alert('Something went wrong...');
            }

            console.log(res);
          }}
          render={({
            values,
            handleSubmit,
            setFieldValue,
            touched,
            errors,
            setFieldTouched,
            isSubmitting,
          }: FormikProps<FormValues>) => (
            <View>
              <Text>Username</Text>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={(value) => setFieldValue('username', value)}
                onBlur={() => setFieldTouched('username')}
                editable={!isSubmitting}
              />
              <Text>Password</Text>
              <Input
                autoCapitalize="none"
                value={values.password}
                onChangeText={(value) => setFieldValue('password', value)}
                onBlur={() => setFieldTouched('password')}
                editable={!isSubmitting}
              />
              <Button title="Sign up" onPress={handleSubmit} />
            </View>
          )}
        />
      )}
    </Mutation>
  </Container>
);

SignupScreen.navigationOptions = {
  title: 'Sign up',
};

export default SignupScreen;
