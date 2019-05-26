import React from 'react';
import styled from 'styled-components';
import { TextInput, TouchableHighlight } from 'react-native';
import { Paragraph } from './text';
import { colors, fonts } from '../../styles';

const baseStyles = {
  borderRadius: 6,
  paddingTop: 13,
  paddingBottom: 13,
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'center',
  alignItems: 'center',
};

const StyledStandardButton = styled(TouchableHighlight)({
  ...baseStyles,
  background: colors.PRIMARY,
});

const ButtonText = styled(Paragraph)({
  color: colors.WHITE,
});

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const StandardButton: React.FC<ButtonProps> = ({ title, onPress }) => (
  <StyledStandardButton
    onPress={() => {
      onPress();
    }}
  >
    <ButtonText>{title}</ButtonText>
  </StyledStandardButton>
);

export { StandardButton };
