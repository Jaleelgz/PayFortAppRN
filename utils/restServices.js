// import axios from 'axios';
// import {sha256, sha256Bytes} from 'react-native-sha256';
// import {env} from '../env';

// export const postData = async (url, data) => {
//   try {
//     const response = await axios.post(`${env.BASE_URL}${url}`, data, {
//       timeout: 500000,
//     });
//     return response.data ? response.data : undefined;
//   } catch (error) {
//     if (__DEV__) {
//       console.error('postData Error : ' + url, error);
//     }

//     return error?.response;
//   }
// };

// export const getSignature = async data => {
//   const passPhrase = '$2y$10$nNbwTtLay';
//   let inputString = '';

//   for (const key of Object.keys(data)) {
//     inputString = `${inputString}${key}=${data[key]}`;
//   }

//   //   inputString = inputString + passPhrase;

//   //   const hash = createHash('sha256');
//   //   hash.update(inputString);
//   //   const res = hash.digest('hex');

//   console.log('inputString :', inputString);

//   const res = await sha256(`${passPhrase}${inputString}${passPhrase}`).then(
//     hash => {
//       console.log(hash);
//       return hash;
//     },
//   );

//   console.log('Res old:', res);

//   return res ?? '';
// };
