import {getDeviceId} from 'rn-amazon-payment-services';
import {ACCESS_CODE, MERCHENT_IDENTIFIER} from '@env';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {getSignature, postData} from './restUtils';
import {ToastModes} from '../enum/ToastModes';

export const getSdkToken = async () => {
  const tmpDeviceId = await getDeviceId();

  const requestData = {
    access_code: ACCESS_CODE,
    device_id: tmpDeviceId,
    language: 'en',
    merchant_identifier: MERCHENT_IDENTIFIER,
    service_command: 'SDK_TOKEN',
  };

  const signature = await getSignature(requestData);

  const token = await postData('', {...requestData, signature});

  console.log('Token :', token);

  if (!token?.sdk_token) {
    Toast.show({
      type: ToastModes.error,
      text1: 'Failed to get SDK token!.Try again!',
    });

    return;
  }

  return token?.sdk_token ?? '';
};
