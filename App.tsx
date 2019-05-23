import * as React from 'react';
import apolloClient from './src/graphql/client';
import { ApolloProvider } from 'react-apollo';

import { createRootNavigator } from './src/navigation';
import * as auth from './src/auth/auth';

const App = () => {
  const [signedIn, setSignedIn] = React.useState(false);

  React.useEffect(() => {
    auth.isSignedIn().then((res: any) => {
      setSignedIn(res);
    });
  }, []);

  const Navigator = createRootNavigator(signedIn);

  return (
    <ApolloProvider client={apolloClient}>
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
