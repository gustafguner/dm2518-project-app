import React, { useState, useEffect } from 'react';
import createUseContext from 'constate';
import { isSignedIn, getUser } from './auth/auth';

const useRootContext = () => {
  const [rootContext, setRootContext]: any = useState({
    auth: {
      signedIn: false,
      user: null,
    },
  });
  useEffect(() => {
    const getAuthStatus = async () => {
      const user = await getUser();
      const signedIn = await isSignedIn();

      setRootContext({
        ...rootContext,
        auth: {
          ...rootContext.auth,
          user,
          signedIn,
        },
      });
    };
    getAuthStatus();
  }, []);
  return { rootContext, setRootContext };
};

const Root = createUseContext(useRootContext);

export { Root, useRootContext };
