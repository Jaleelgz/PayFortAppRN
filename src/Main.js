import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDeviceId} from 'rn-amazon-payment-services';
import MainNavigation from './navigation/MainNavigation';
import {useDispatch} from 'react-redux';
import {
  AddDeviceIdToStore,
  AddSDKTokenToStore,
  GetCardsFromStore,
  GetDeviceIdFromStore,
  GetSDKTokenFromStore,
} from './utils/cardStoreUtils';
import {setCards} from './store/slices/cardsSlice';
import {setDeviceId} from './store/slices/deviceIdSlice';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastModes} from './enum/ToastModes';
import Loader from './common/Loader';
import {ACCESS_CODE, MERCHENT_IDENTIFIER} from '@env';
import {getSignature, postData} from './utils/restUtils';
import {setSDKToken} from './store/slices/sdkTokenSlice';

const Main = () => {
  const [loadding, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getCards = async () => {
    setLoading(true);
    const cards = await GetCardsFromStore();
    const storedDeviceId = await GetDeviceIdFromStore();

    dispatch(setCards(cards));

    if (storedDeviceId && storedDeviceId?.trim() !== '') {
      dispatch(setDeviceId(storedDeviceId));
      setLoading(false);
      getSdkToken(storedDeviceId);
      return;
    }

    try {
      const tmpDeviceId = await getDeviceId();

      if (tmpDeviceId) {
        dispatch(setDeviceId(tmpDeviceId));
        await AddDeviceIdToStore(tmpDeviceId);
        setLoading(false);
        getSdkToken(tmpDeviceId);
      }
    } catch (error) {
      console.log('Error on Main :', error);
      Toast.show({type: ToastModes.error, text1: 'Failed to get device Id!'});
      setLoading(false);
    }
  };

  const getSdkToken = async device_id => {
    const storedSdkToken = await GetSDKTokenFromStore();

    if (storedSdkToken) {
      dispatch(setSDKToken(storedSdkToken));
      setLoading(false);
      return;
    }

    setLoading(true);

    const requestData = {
      access_code: ACCESS_CODE,
      device_id: device_id,
      language: 'en',
      merchant_identifier: MERCHENT_IDENTIFIER,
      service_command: 'SDK_TOKEN',
    };

    const signature = await getSignature(requestData);

    const token = await postData('', {...requestData, signature});

    if (!token?.sdk_token) {
      Toast.show({
        type: ToastModes.error,
        text1: 'Failed to get SDK token!.Try again!',
      });
      setLoading(false);
      return;
    }

    dispatch(setSDKToken(token?.sdk_token ?? ''));
    await AddSDKTokenToStore(token?.sdk_token);
    setLoading(false);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <View style={styles.container}>
      {loadding && <Loader />}
      <MainNavigation />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
});
