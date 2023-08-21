import axios from 'axios';
import {sha256} from 'react-native-sha256';
import {BASE_URL, SHA_REQUEST_PHRASE} from '@env';

export const postData = async (url, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data, {
      timeout: 500000,
    });
    return response.data ?? undefined;
  } catch (error) {
    if (__DEV__) {
      console.error('postData Error : ' + url, error);
    }

    return error?.response;
  }
};

export const getSignature = async data => {
  let inputString = '';

  for (const key of Object.keys(data)) {
    inputString = `${inputString}${key}=${data[key]}`;
  }

  const res = await sha256(
    `${SHA_REQUEST_PHRASE}${inputString}${SHA_REQUEST_PHRASE}`,
  ).then(hash => {
    console.log(hash);
    return hash;
  });

  return res ?? '';
};
