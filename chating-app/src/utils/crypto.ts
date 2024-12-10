import CryptoJS from "crypto-js";

export const hashKey = (key: string): string => {
  return CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex);
};

export const validateKey = (inputKey: string, storedHash: string): boolean => {
  return hashKey(inputKey) === storedHash;
};
