import styled from 'styled-components';
import { Text } from 'react-native';
import { colors, fonts } from '../../styles';

const baseStyles = {
  fontFamily: fonts.CIRCULAR_BOOK,
  color: colors.OFF_BLACK,
};

export const Paragraph = styled(Text)({
  ...baseStyles,
  fontSize: 17,
});

export const SmallParagraph = styled(Text)({
  ...baseStyles,
  fontSize: 13,
});

export const Title = styled(Text)({
  ...baseStyles,
  fontSize: 20,
  fontWeight: 'bold',
});
