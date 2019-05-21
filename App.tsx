import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

const App = () => (
  <View>
    <Text>Hej</Text>
  </View>
);

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
  },
});

export default createAppContainer(AppNavigator);
