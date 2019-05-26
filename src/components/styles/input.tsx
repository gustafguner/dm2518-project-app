import styled from 'styled-components';
import { TextInput } from 'react-native';
import { colors, fonts } from '../../styles';

const baseStyles = {
  fontFamily: fonts.CIRCULAR_BOOK,
  fontSize: 16,
  color: colors.OFF_BLACK,
  background: colors.OFF_WHITE,
  border: 0,
  borderRadius: 6,
};

const StandardTextInput = styled(TextInput)({
  ...baseStyles,
  padding: 12,
});

export { StandardTextInput };
