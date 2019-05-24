import styled from 'styled-components';
import { View } from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

export const Spacing = styled(View)(({ width, height }: Props) => ({
  width: width || 1,
  height: height || 1,
}));
