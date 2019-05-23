import AsyncStorage from '@react-native-community/async-storage';
import to from 'await-to-js';

const setToken = async (token: string) => {
  const [err] = await to(AsyncStorage.setItem('token', token));
  return !err;
};

const getToken = async () => {
  const [, data] = await to(AsyncStorage.getItem('token'));
  return data;
};

const removeToken = async () => {
  const [err] = await to(AsyncStorage.removeItem('token'));
  return !err;
};

const isSignedIn = async () => {
  const [err, token] = await to(AsyncStorage.getItem('token'));

  if (err || !token) {
    return false;
  }

  return true;
};

export { setToken, getToken, removeToken, isSignedIn };
