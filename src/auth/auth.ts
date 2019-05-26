import AsyncStorage from '@react-native-community/async-storage';
import to from 'await-to-js';
import { RSA } from 'react-native-rsa-native';

const TOKEN = 'token';
const USER = 'user';
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

const setUser = async (user: object) => {
  const [err] = await to(AsyncStorage.setItem(USER, JSON.stringify(user)));
  return !err;
};

const getUser = async () => {
  const [, data] = await to(AsyncStorage.getItem(USER));
  return data ? JSON.parse(data) : null;
};

const removeUser = async () => {
  const [err] = await to(AsyncStorage.removeItem(USER));
  return !err;
};

const setPrivateKey = async (privateKey: string) => {
  const [err] = await to(AsyncStorage.setItem(PRIVATE_KEY, privateKey));
  return !err;
};

const getPrivateKey = async () => {
  const [, data] = await to(AsyncStorage.getItem(PRIVATE_KEY));
  return data;
};

const removePrivateKey = async () => {
  const [err] = await to(AsyncStorage.removeItem(PRIVATE_KEY));
  return !err;
};

const signOut = async () => {
  await removeToken();
  await removePrivateKey();
};

export {
  setToken,
  getToken,
  removeToken,
  isSignedIn,
  setUser,
  getUser,
  removeUser,
  setPrivateKey,
  getPrivateKey,
  removePrivateKey,
  signOut,
};
