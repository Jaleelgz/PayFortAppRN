import EncryptedStorage from 'react-native-encrypted-storage';

export const AddCardsToStore = async cards => {
  await EncryptedStorage.setItem('cards', JSON.stringify(cards));
};

export const GetCardsFromStore = async () => {
  const cards = await EncryptedStorage.getItem('cards');

  if (cards) {
    return JSON.parse(cards);
  } else {
    return [];
  }
};

export const AddDeviceIdToStore = async id => {
  await EncryptedStorage.setItem('deviceId', JSON.stringify(id));
};

export const GetDeviceIdFromStore = async () => {
  const idRes = await EncryptedStorage.getItem('deviceId');

  return idRes;
};

export const AddSDKTokenToStore = async token => {
  await EncryptedStorage.setItem('token', JSON.stringify(token));
};

export const GetSDKTokenFromStore = async () => {
  const tokenRes = await EncryptedStorage.getItem('token');

  return tokenRes;
};
