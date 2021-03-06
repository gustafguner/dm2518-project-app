import * as React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';
import { fonts, colors } from '../styles';
import { ProfileIcon } from '../components/icons/Profile';
import { ChatIcon } from '../components/icons/Chat';
import ConversationScreen from '../screens/conversation';

interface IconProps {
  routeName: string;
  focused: boolean;
}

const TabBarIcon: React.FC<IconProps> = ({ routeName, focused }) => (
  <>
    {routeName === 'Profile' ? (
      <ProfileIcon
        width={20}
        height={20}
        fill={focused ? colors.PRIMARY : '#606060'}
      />
    ) : (
      <ChatIcon
        width={20}
        height={20}
        fill={focused ? colors.PRIMARY : '#606060'}
      />
    )}
  </>
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Conversation: ConversationScreen,
  },
  {
    initialRouteName: 'Home',
    cardStyle: { backgroundColor: colors.OFF_WHITE },
  },
);

HomeStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (
    navigation.state.index > 0 &&
    navigation.state.routes[1].routeName === 'Conversation'
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  { cardStyle: { backgroundColor: colors.OFF_WHITE } },
);

const SignedIn = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        // You can return any component that you like here!
        return <TabBarIcon routeName={routeName} focused={focused} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: 'gray',
      labelStyle: {
        fontFamily: fonts.CIRCULAR_BOOK,
        fontSize: 11,
      },
    },
  },
);

export default SignedIn;
