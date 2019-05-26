import * as React from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import { NavigationScreenProps } from 'react-navigation';
import { Formik, FormikProps } from 'formik';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { generateKeyPair } from '../../crypto';
import { setPrivateKey, setToken, setUser } from '../../auth/auth';
import { Root } from '../../Root';
import { fonts } from '../../styles';
import { Title, Paragraph } from '../../components/styles/text';
import { StandardButton } from '../../components/styles/buttons';
import { Spacing } from '../../components/Spacing';
import { StandardTextInput } from '../../components/styles/input';

const SIGN_UP_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        username
        publicKey
      }
      token
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
  height: 70,
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
}) => {
  const { rootContext, setRootContext }: any = React.useContext(Root.Context);
  return (
    <Container>
      <Header>
        <Title>Sign up</Title>
      </Header>
      <Mutation mutation={SIGN_UP_MUTATION}>
        {(mutate: any) => (
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

              console.log('signup', res);

              if (res.data.createUser !== null) {
                await setToken(res.data.createUser.token);
                await setUser(res.data.createUser.user);
                setRootContext({
                  ...rootContext,
                  auth: {
                    ...rootContext.auth,
                    signedIn: true,
                    user: res.data.createUser.user,
                  },
                });
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
                <Paragraph>Username</Paragraph>
                <Spacing height={5} />
                <StandardTextInput
                  placeholder="Username"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={(value) => setFieldValue('username', value)}
                  onBlur={() => setFieldTouched('username')}
                  editable={!isSubmitting}
                />

                <Spacing height={15} />

                <Paragraph>Password</Paragraph>
                <Spacing height={5} />
                <StandardTextInput
                  placeholder="Password"
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={(value) => setFieldValue('password', value)}
                  onBlur={() => setFieldTouched('password')}
                  editable={!isSubmitting}
                />

                <Spacing height={25} />
                <StandardButton title="Sign up" onPress={handleSubmit} />
              </View>
            )}
          />
        )}
      </Mutation>
    </Container>
  );
};

SignupScreen.navigationOptions = {
  title: 'Sign up',
  headerTitleStyle: {
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'normal',
  },
};

export default SignupScreen;
