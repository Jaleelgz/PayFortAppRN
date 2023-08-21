import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {PaymentIcon} from 'react-native-payment-icons';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalStyles, ScreenPadding} from '../utils/globalStyles';
import {useSelector} from 'react-redux';
import {COLORS} from '../constants/colors';
import CardType from 'credit-card-type';
import {FONTS, FONT_SIZE} from '../constants/fonts';
import {Checkbox, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastModes} from '../enum/ToastModes';
import {DirectPayButton} from 'rn-amazon-payment-services';
import {getUUID} from '../utils/restUtils';
import {getSdkToken} from '../utils/sdkUtils';

const AddCard = () => {
  const navigation = useNavigation();
  const router = useRoute();

  const {amount, email} = router.params;
  const {height, width} = useWindowDimensions();

  const [sdkToken, setSDKToken] = useState('');

  const [card, setCard] = useState(
    router.params.card
      ? {...router.params.card, cvv: ''}
      : {
          card_number: '',
          customer_name: '',
          expiry_date: '',
          cvv: '',
        },
  );
  const [loadding, setLoading] = useState(false);
  const [saveCard, setSaveCard] = useState(true);
  const [disableBtn, setDisableBtn] = useState(true);
  const [cardType, setCardType] = useState('generic');

  const validateCardDetails = () => {
    if (card.card_number && card.card_number?.trim()?.length >= 4) {
      const cardParse = CardType(card.card_number);

      setCardType(cardParse[0]?.type ?? 'generic');
    }

    for (const key of Object.keys(card)) {
      if (card[key]?.trim() === '') {
        setDisableBtn(true);
        return;
      }
    }

    setDisableBtn(false);
  };

  const onSuccess = async response => {
    Toast.show({type: ToastModes.success, text1: 'Success!'});

    navigation.navigate('Success', {amount});
  };

  const onFailure = response => {
    console.log('failure', response);
    Toast.show({type: ToastModes.error, text1: 'Failed to pay.Try again!'});

    navigation.navigate('Failed', {amount});
  };

  const onChangeExpiry = text => {
    let textTemp = text
      .replace(/^([1-9]\/|[2-9])$/g, '0$1/')
      .replace(/^(0[1-9]|1[0-2])$/g, '$1/')
      .replace(/^([0-1])([3-9])$/g, '0$1/$2')
      .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2')
      .replace(/^([0]+)\/|[0]+$/g, '0')
      .replace(/[^\d\/]|^[\/]*$/g, '')
      .replace(/\/\//g, '/');

    setCard({...card, expiry_date: textTemp});
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
    validateCardDetails();
  }, [card]);

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
      <View style={[GlobalStyles.screen, styles.container]}>
        <View style={styles.innerContainer}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.headTxt}>Payment amount</Text>
                <View style={styles.amntContainer}>
                  <MaterialCommunityIcons
                    color={'#455154'}
                    name="currency-usd"
                    size={25}
                  />
                  <Text style={[styles.headTxt, styles.amntTxt]}>{amount}</Text>
                </View>
              </View>
              <PaymentIcon type={cardType} width={50} />
            </View>
          </View>

          <View>
            <Text style={styles.headTxt}>Name on card</Text>
            <TextInput
              mode="outlined"
              editable={!router.params?.card}
              outlineStyle={styles.textInputOutline}
              outlineColor={COLORS.TEXT_SECONDARY}
              value={card.card_holder_name}
              onChangeText={value =>
                setCard({...card, card_holder_name: value})
              }
              maxLength={30}
              style={[styles.textInputStyle]}
              selectionColor={COLORS.PRIMARY}
            />
          </View>

          <View>
            <Text style={styles.headTxt}>Card number</Text>
            <TextInput
              mode="outlined"
              editable={!router.params?.card}
              outlineStyle={styles.textInputOutline}
              outlineColor={COLORS.TEXT_SECONDARY}
              value={card.card_number}
              placeholder="0000 0000 0000 0000"
              keyboardType="number-pad"
              onChangeText={value =>
                setCard({
                  ...card,
                  card_number: value
                    .replace(/\s?/g, '')
                    .replace(/(\d{4})/g, '$1 ')
                    .trim(),
                })
              }
              maxLength={20}
              style={[styles.textInputStyle]}
              selectionColor={COLORS.PRIMARY}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View style={{flex: 1}}>
              <Text style={styles.headTxt}>expiry_date date</Text>
              <TextInput
                mode="outlined"
                editable={!router.params?.card}
                outlineStyle={styles.textInputOutline}
                outlineColor={COLORS.TEXT_SECONDARY}
                value={card.expiry_date}
                placeholder="mm/yy"
                keyboardType="number-pad"
                onChangeText={onChangeExpiry}
                maxLength={5}
                style={[styles.textInputStyle]}
                selectionColor={COLORS.PRIMARY}
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.headTxt}>Security code / CVV</Text>
              <TextInput
                secureTextEntry={true}
                error={card.cvv?.trim() === ''}
                mode="outlined"
                editable={true}
                outlineStyle={styles.textInputOutline}
                outlineColor={COLORS.TEXT_SECONDARY}
                value={card.cvv}
                placeholder="***"
                keyboardType="number-pad"
                onChangeText={value => setCard({...card, cvv: value})}
                maxLength={5}
                style={[styles.textInputStyle]}
                selectionColor={COLORS.PRIMARY}
              />
            </View>
          </View>

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

          {card?.cvv?.trim()?.length !== 3 && (
            <Text
              style={{...GlobalStyles.screenSubTxt, color: COLORS.TOAST_ERROR}}>
              Please type valid cvv
            </Text>
          )}

          {!loadding &&
            sdkToken?.trim() !== '' &&
            card?.cvv?.trim()?.length === 3 && (
              <DirectPayButton
                requestObject={{
                  command: 'PURCHASE',
                  merchant_reference: getUUID(),
                  amount: amount,
                  currency: 'AED',
                  language: 'en',
                  customer_email: email,
                  sdk_token: sdkToken,
                  token_name: card.token_name,
                  card_security_code: card.cvv,
                }}
                environment={'TEST'}
                style={{width: width, height: 100}}
                payButtonProps={{
                  marginTop: 20,
                  marginLeft: 20,
                  backgroundColor: COLORS.PRIMARY,
                  text: `Pay $${amount}`,
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
            )}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    borderWidth: 1,
    width: '100%',
    minHeight: 500,
    padding: ScreenPadding,
    borderColor: COLORS.DISABLED_D4,
    borderRadius: 5,
    rowGap: 10,
  },
  headTxt: {
    fontFamily: FONTS.InterMedium,
    fontSize: FONT_SIZE.NORMAL,
    color: COLORS.GRAY,
  },
  amntContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  amntTxt: {
    fontSize: 25,
  },
  textInputStyle: {
    width: '100%',
    fontSize: FONT_SIZE.NORMAL,
    backgroundColor: '#fff',
    borderColor: COLORS.TEXT_SECONDARY,
    fontFamily: FONTS.InterRegular,
  },
  textInputOutline: {
    borderWidth: 1,
    borderRadius: 5,
  },
  saveCardTxt: {
    fontFamily: FONTS.InterRegular,
    fontSize: FONT_SIZE.NORMAL,
    color: COLORS.GRAY,
  },
});
