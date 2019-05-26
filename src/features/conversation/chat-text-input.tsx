import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors, fonts } from '../../styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Paragraph } from '../../components/styles/text';
import { UpArrowIcon } from '../../components/icons/UpArrow';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: 92,
  paddingBottom: 22,
  paddingTop: 16,
  paddingLeft: 16,
  paddingRight: 16,
  background: colors.WHITE,
});

const StyledTextInput = styled(TextInput)({
  flex: 1,
  height: 50,
  background: colors.OFF_WHITE,
  borderRadius: 50,
  paddingLeft: 18,
  paddingRight: 18,
  fontFamily: fonts.CIRCULAR_BOOK,
  fontSize: 16,
});

const SendButton = styled(TouchableOpacity)({
  width: 50,
  height: 50,
  marginLeft: 16,
  background: colors.PRIMARY,
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center',
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
        placeholder="Type your message"
        onSubmitEditing={() => {
          sendMessage(fieldText);
          setFieldText('');
        }}
      />
      <SendButton
        onPress={() => {
          sendMessage(fieldText);
          setFieldText('');
        }}
      >
        <UpArrowIcon width={30} height={30} fill={colors.WHITE} />
      </SendButton>
      <KeyboardSpacer />
    </Container>
  );
};

export default ChatTextInput;
