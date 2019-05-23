import * as React from 'react';
import apolloClient from './src/graphql/client';
import { ApolloProvider } from 'react-apollo';

import { createRootNavigator } from './src/navigation';

const App = () => {
  const Navigator = createRootNavigator(true);
  return (
    <ApolloProvider client={apolloClient}>
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
