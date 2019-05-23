import * as React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import SignedIn from './signed-in';
import SignedOut from './signed-out';

export const createRootNavigator = (signedIn: boolean) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn,
        },
        SignedOut: {
          screen: SignedOut,
        },
      },
      {
        initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      },
    ),
  );
