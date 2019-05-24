import React from 'react';
import { StyledModal, ModalProps } from '../../components/Modal';
import { Paragraph } from '../../components/styles/text';
import { Spacing } from '../../components/Spacing';
import { Formik, FormikProps } from 'formik';
import { View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($username: String!) {
    createConversation(username: $username) {
      id
      from
      to
    }
  }
`;

interface FormValues {
  username: string;
}

export const CreateConversationModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => (
  <StyledModal visible={visible} onClose={onClose}>
    <Paragraph>Create conversation</Paragraph>
    <Spacing height={10} />

    <Mutation mutation={CREATE_CONVERSATION_MUTATION}>
      {(mutate: any) => (
        <Formik
          initialValues={{ username: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(values);

            const res: any = await mutate({
              variables: {
                username: values.username,
              },
            });

            console.log(res);

            if (res.data.createConversation !== null) {
              onClose();
            }
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
              <TextInput
                style={{ borderWidth: 1 }}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.username}
                onChangeText={(value) => setFieldValue('username', value)}
                onBlur={() => setFieldTouched('username')}
                editable={!isSubmitting}
              />
              <Button title="Send" onPress={handleSubmit} />
            </View>
          )}
        />
      )}
    </Mutation>
  </StyledModal>
);
