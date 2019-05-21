import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { any } from 'prop-types';

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => (
  <View>
    <Text>Home</Text>
    <Button
      onPress={() => {
        navigation.navigate('Profile');
      }}
      title="Go to Profile"
    />
  </View>
);

export default HomeScreen;
