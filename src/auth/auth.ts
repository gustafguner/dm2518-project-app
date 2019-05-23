import AsyncStorage from '@react-native-community/async-storage';
import to from 'await-to-js';

const TOKEN = 'token';
const PRIVATE_KEY = 'privateKey';

const setToken = async (token: string) => {
  const [err] = await to(AsyncStorage.setItem(TOKEN, token));
  return !err;
};

const getToken = async () => {
  const [, data] = await to(AsyncStorage.getItem(TOKEN));
  return data;
};

const removeToken = async () => {
  const [err] = await to(AsyncStorage.removeItem(TOKEN));
  return !err;
};

const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(TOKEN)
      .then((res) => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject(err));
  });
};

const setPrivateKey = async (privateKey: string) => {
  const [err] = await to(AsyncStorage.setItem(PRIVATE_KEY, privateKey));
  return !err;
};

const getPrivateKey = async (privateKey: string) => {
  const [, data] = await to(AsyncStorage.getItem(PRIVATE_KEY));
  return !data;
};

const removePrivateKey = async () => {
  const [err] = await to(AsyncStorage.removeItem(PRIVATE_KEY));
  return !err;
};

export {
  setToken,
  getToken,
  removeToken,
  isSignedIn,
  setPrivateKey,
  getPrivateKey,
  removePrivateKey,
};
