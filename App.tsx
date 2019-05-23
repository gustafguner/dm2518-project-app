import * as React from 'react';
import apolloClient from './src/graphql/client';
import { ApolloProvider } from 'react-apollo';

import { createRootNavigator } from './src/navigation';
import { getToken, setToken, removeToken, isSignedIn } from './src/auth/auth';

const testStorage = async () => {
  const token = await getToken();
  console.log(token);
};

const App = () => {
  testStorage();
  const Navigator = createRootNavigator(true);
  return (
    <ApolloProvider client={apolloClient}>
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
