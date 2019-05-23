import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/welcome';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/signup';

const SignedOut = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
  },
  {
    initialRouteName: 'Welcome',
  },
);

export default SignedOut;
