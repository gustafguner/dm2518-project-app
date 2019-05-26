import { RSA } from 'react-native-rsa-native';
import to from 'await-to-js';
import { getPrivateKey } from '../auth/auth';

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const generateKeyPair = async () => {
  const [err, keys] = await to(RSA.generateKeys(4096));

  if (err || !keys) {
    return false;
  }

  return { publicKey: keys.public, privateKey: keys.private };
};

const encryptWithPublicKey = async (payload: string, publicKey: any) => {
  const [err, data] = await to(RSA.encrypt(payload, publicKey));
  if (err || !data) {
    return false;
  }

  return data;
};

const decryptWithPrivateKey = async (payload: any) => {
  const privateKey = await getPrivateKey();

  if (!privateKey) return false;

  const [err, data] = await to(RSA.decrypt(payload, privateKey));

  if (err || !data) {
    return false;
  }

  return data;
};

export { encryptWithPublicKey, decryptWithPrivateKey, generateKeyPair };
