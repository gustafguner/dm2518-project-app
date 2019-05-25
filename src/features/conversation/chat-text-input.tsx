import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';
import { colors } from '../../styles';

const Container = styled(View)({
  borderWidth: 1,
  justifyContent: 'center',
  width: '100%',
});

const StyledTextInput = styled(TextInput)({
  height: 65,
  background: colors.WHITE,
});

interface Props {
  sendMessage: (body: string) => void;
}

const ChatTextInput: React.FC<Props> = ({ sendMessage }) => {
  const [fieldText, setFieldText] = React.useState('');

  return (
    <Container>
      <StyledTextInput
        onChangeText={(text) => setFieldText(text)}
        value={fieldText}
        onSubmitEditing={() => {
          sendMessage(fieldText);
          setFieldText('');
        }}
      />
    </Container>
  );
};

export default ChatTextInput;
