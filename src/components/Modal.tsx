import React from 'react';
import { View, Text, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../styles';
import styled from 'styled-components';

const ModalContainer = styled(View)({
  height: 'auto',
  background: colors.WHITE,
  borderRadius: 10,
  padding: 16,
});

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

export const StyledModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
}) => (
  <Modal
    isVisible={visible}
    onBackdropPress={() => onClose()}
    backdropOpacity={0.6}
    animationIn="bounceIn"
    animationOut="fadeOut"
    animationInTiming={600}
    animationOutTiming={300}
    backdropTransitionInTiming={300}
    backdropTransitionOutTiming={0}
  >
    <ModalContainer>{children}</ModalContainer>
  </Modal>
);
