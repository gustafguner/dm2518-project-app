import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { colors } from '../styles';

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export const Loader = () => (
  <Container
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator size="large" color={colors.PRIMARY} />
  </Container>
);
