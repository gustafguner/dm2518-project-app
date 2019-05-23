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

const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
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

export { setToken, getToken, removeToken, isSignedIn };
