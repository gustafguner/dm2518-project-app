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
import { StandardButton } from '../../components/styles/buttons';
import { StandardTextInput } from '../../components/styles/input';
import { Spacing } from '../../components/Spacing';
import { Title, Paragraph } from '../../components/styles/text';
import { fonts } from '../../styles';
import { Root } from '../../Root';
import { Loader } from '../../components/Loader';

const SIGN_IN_MUTATION = gql`
  mutation LogIn($input: LoginInput!) {
    login(input: $input) {
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
  username: string;
  password: string;
  privateKey: string;
}

const Container = styled(View)({
  padding: 16,
});

const Header = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  height: 70,
});

const Form = styled(Formik)({
  flexFlow: 'column',
});

const LoginScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => {
  const [isLoggingIn, setIsLoggingIn]: any = React.useState(false);
  const { rootContext, setRootContext }: any = React.useContext(Root.Context);
  return isLoggingIn === false ? (
    <Container>
      <Header>
        <Title>Sign in</Title>
      </Header>
      <Mutation mutation={SIGN_IN_MUTATION}>
        {(mutate: any) => (
          <Form
            initialValues={{ username: '', password: '', privateKey: '' }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setIsLoggingIn(true);

              const res: any = await mutate({
                variables: {
                  input: {
                    username: values.username,
                    password: values.password,
                  },
                },
              });

              console.log('sign in', res);

              if (res.data.login !== null) {
                await setToken(res.data.login.token);
                await setUser(res.data.login.user);
                await setPrivateKey(values.privateKey);
                setRootContext({
                  ...rootContext,
                  auth: {
                    ...rootContext.auth,
                    signedIn: true,
                    user: res.data.login.user,
                  },
                });
                navigation.navigate('SignedIn');
              } else {
                Alert.alert('Something went wrong...');
              }

              setIsLoggingIn(false);

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
                  keyboardType="default"
                  autoCapitalize="none"
                  value={values.username}
                  onChangeText={(value) => setFieldValue('username', value)}
                  onBlur={() => setFieldTouched('username')}
                  editable={!isSubmitting}
                />
                <Spacing height={15} />

                <Paragraph>Password</Paragraph>
                <Spacing height={5} />
                <StandardTextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={(value) => setFieldValue('password', value)}
                  onBlur={() => setFieldTouched('password')}
                  editable={!isSubmitting}
                />

                <Spacing height={15} />

                <Paragraph>Private key</Paragraph>
                <Spacing height={5} />
                <StandardTextInput
                  placeholder="Private key"
                  autoCapitalize="none"
                  value={values.privateKey}
                  onChangeText={(value) => setFieldValue('privateKey', value)}
                  onBlur={() => setFieldTouched('privateKey')}
                  editable={!isSubmitting}
                />
                <Spacing height={25} />
                <StandardButton title="Sign in" onPress={handleSubmit} />
              </View>
            )}
          />
        )}
      </Mutation>
    </Container>
  ) : (
    <Loader />
  );
};

LoginScreen.navigationOptions = {
  title: 'Sign in',
  headerTitleStyle: {
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'normal',
  },
};

export default LoginScreen;
