import crypto from 'crypto';

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const generateKeyPair = () => {
  return new Promise<KeyPair>((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      },
      (err, publicKey, privateKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({ publicKey, privateKey });
        }
      },
    );
  });
};

const encryptWithPublicKey = (toEncrypt: string, publicKey: any) => {
  const buffer = Buffer.from(toEncrypt);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

const decryptWithPrivateKey = (toDecrypt: any, privateKey: any) => {
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

export { encryptWithPublicKey, decryptWithPrivateKey, generateKeyPair };
