import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {getUUID} from '../utils/restUtils';
import {CustomCheckoutView} from 'rn-amazon-payment-services';
import {ToastModes} from '../enum/ToastModes';
import {FONTS, FONT_SIZE} from '../constants/fonts';
import {COLORS} from '../constants/colors';
import {GlobalStyles, ScreenPadding} from '../utils/globalStyles';
import {Checkbox} from 'react-native-paper';
import {AddCardsToStore} from '../utils/cardStoreUtils';
import {addCard} from '../store/slices/cardsSlice';
import {getSdkToken} from '../utils/sdkUtils';
import Loader from '../common/Loader';

const AddCardByPayFortUI = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const router = useRoute();
  const cards = useSelector(state => state.cards.value);
  const [sdkToken, setSDKToken] = useState('');

  const {amount, email} = router.params;
  const {height, width} = useWindowDimensions();

  const [saveCard, setSaveCard] = useState(true);
  const [loadding, setLoading] = useState(false);

  const requestObject = {
    command: 'PURCHASE',
    merchant_reference: getUUID(),
    amount: amount,
    currency: 'AED',
    language: 'en',
    customer_email: email,
    sdk_token: sdkToken,
  };

  const onSuccess = async response => {
    Toast.show({type: ToastModes.success, text1: 'Success!'});

    if (saveCard) {
      const isExist = cards.find(
        tmpCard => tmpCard.card_number === response.card_number,
      );

      if (!isExist) {
        const newCards = [...cards, {...response, cvv: ''}];

        await AddCardsToStore(newCards);
        dispatch(addCard(response));
        Toast.show({type: ToastModes.success, text1: 'Card saved!'});
      }
    }

    navigation.navigate('Success', {amount});
  };

  const onFailure = response => {
    console.log('failure', response);
    Toast.show({type: ToastModes.error, text1: 'Failed to pay.Try again!'});

    navigation.navigate('Failed', {amount});
  };

  const fetchSdkToken = async () => {
    setLoading();

    const tmpSdkToken = await getSdkToken();

    if (!tmpSdkToken) {
      Toast.show({type: ToastModes.error, text1: 'Failed to fetch sdk token!'});
      setLoading(false);
      return;
    }

    setSDKToken(tmpSdkToken);
    setLoading(false);
    return;
  };

  useEffect(() => {
    fetchSdkToken();
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        minHeight: height,
      }}
      style={GlobalStyles.appBarHeightMargin}>
      {loadding && <Loader />}
      <View style={[GlobalStyles.screen, styles.container]}>
        <Text style={GlobalStyles.screenHeadTxt}>Pay ${amount}</Text>

        {!loadding && sdkToken?.trim() !== '' ? (
          <CustomCheckoutView
            requestObject={requestObject}
            environment={'TEST'}
            style={{
              width: width - ScreenPadding * 2,
              height: 400,
            }}
            payButtonProps={{
              marginTop: 20,
              marginLeft: 20,
              backgroundColor: COLORS.PRIMARY,
              text: `Pay ${amount}`,
              textSize: FONT_SIZE.MEDIUM,
              textColor: '#ffffff',
              buttonWidth: 150,
              buttonHeight: 40,
              borderRadius: 5,
              textFontFamily: FONTS.InterBold,
            }}
            onFailure={onFailure}
            onSuccess={onSuccess}
          />
        ) : (
          <View style={{flex: 1}} />
        )}

        {!router.params?.card && (
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Checkbox
              status={saveCard ? 'checked' : 'unchecked'}
              onPress={() => {
                setSaveCard(!saveCard);
              }}
            />

            <Text style={styles.saveCardTxt}>Save card</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AddCardByPayFortUI;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveCardTxt: {
    fontFamily: FONTS.InterRegular,
    fontSize: FONT_SIZE.NORMAL,
    color: COLORS.GRAY,
  },
});
