import * as React from 'react';
import {
  NavigationScreenProps,
  NavigationScreenComponent,
} from 'react-navigation';

import {
  generateKeyPair,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from '../../crypto';
import { fonts, colors } from '../../styles';
import Home from '../../features/home';

const test = async () => {
  const keyPair = await generateKeyPair();

  if (keyPair !== false) {
    const message = 'Lorem ipsum';
    const encryptedMessage = await encryptWithPublicKey(
      message,
      keyPair.publicKey,
    );

    const decryptedMessage = await decryptWithPrivateKey(
      encryptedMessage,
      keyPair.privateKey,
    );
    console.log(decryptedMessage);
  }
};

const HomeScreen: NavigationScreenComponent<NavigationScreenProps> = ({
  navigation,
}) => <Home navigation={navigation} />;

HomeScreen.navigationOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontFamily: fonts.CIRCULAR_BOOK,
    fontWeight: 'normal',
  },
};

export default HomeScreen;
