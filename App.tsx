import * as React from 'react';
import apolloClient from './src/graphql/client';
import { ApolloProvider } from 'react-apollo';

import Navigation from './src/navigation';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Navigation />
  </ApolloProvider>
);

export default App;

// export default createAppContainer(AppNavigator);
/*
const App = () => (
  <ApolloProvider client={apolloClient}>
    {createAppContainer(AppNavigator)}
  </ApolloProvider>
);

export default App;
*/
