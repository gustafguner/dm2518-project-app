import React, { isValidElement } from 'react';
import { StyledModal, ModalProps } from '../../components/Modal';
import { Paragraph, Title, ModalTitle } from '../../components/styles/text';
import { StandardTextInput } from '../../components/styles/input';
import { Spacing } from '../../components/Spacing';
import { Formik, FormikProps } from 'formik';
import { View, Button, Alert, NativeModules, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import to from 'await-to-js';
import { encryptWithPublicKey } from '../../crypto';
import { signOut } from '../../auth/auth';
import { StandardButton } from '../../components/styles/buttons';
var Aes = NativeModules.Aes;

const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($username: String!) {
    createConversation(username: $username) {
      id
      from {
        id
        username
        publicKey
      }
      to {
        id
        username
        publicKey
      }
    }
  }
`;

const CREATE_SYMMETRIC_KEY_MUTATION = gql`
  mutation CreateSymmetricKey($input: CreateSymmetricKeyInput!) {
    createSymmetricKey(input: $input)
  }
`;

interface FormValues {
  username: string;
}

export const CreateConversationModal: React.FC<ModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <StyledModal visible={visible} onClose={onClose}>
      <ModalTitle>Create conversation</ModalTitle>
      <Spacing height={20} />

      <Mutation mutation={CREATE_CONVERSATION_MUTATION}>
        {(mutate: any) => (
          <Mutation mutation={CREATE_SYMMETRIC_KEY_MUTATION}>
            {(createSymmetricKey: any) => (
              <Formik
                initialValues={{ username: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);

                  const res: any = await mutate({
                    variables: {
                      username: values.username,
                    },
                  });

                  if (res.data.createConversation !== null) {
                    const conversation = res.data.createConversation;

                    const [symmetricKeyErr, symmetricKey] = await to(
                      Aes.randomKey(128),
                    );

                    if (symmetricKeyErr || !symmetricKey) {
                      Alert.alert('Error creating symmetric key');
                    }

                    const [ivErr, iv] = await to(Aes.randomKey(32));

                    if (ivErr || !iv) {
                      Alert.alert('Error creating IV');
                    }

                    console.log(`Symmetric key: ${symmetricKey}`);
                    console.log(`IV: ${iv}`);
                    console.log(`Conversation`, conversation);

                    const encryptedFromSymmetricKey = await encryptWithPublicKey(
                      symmetricKey,
                      conversation.from.publicKey,
                    );
                    const encryptedToSymmetricKey = await encryptWithPublicKey(
                      symmetricKey,
                      conversation.to.publicKey,
                    );

                    const symmmetricKeyRes: any = await createSymmetricKey({
                      variables: {
                        input: {
                          conversationId: res.data.createConversation.id,
                          fromKey: encryptedFromSymmetricKey,
                          toKey: encryptedToSymmetricKey,
                          iv,
                        },
                      },
                    });

                    if (symmmetricKeyRes.data.createSymmetricKey !== false) {
                      onClose();
                    }
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
                    <StandardTextInput
                      placeholder="Username"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={values.username}
                      onChangeText={(value) => setFieldValue('username', value)}
                      onBlur={() => setFieldTouched('username')}
                      editable={!isSubmitting}
                    />
                    <Spacing height={15} />
                    <StandardButton title="Send" onPress={handleSubmit} />
                  </View>
                )}
              />
            )}
          </Mutation>
        )}
      </Mutation>
    </StyledModal>
  );
};
