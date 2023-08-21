import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {PaymentIcon} from 'react-native-payment-icons';
import moment from 'moment/moment';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalStyles, ScreenPadding} from '../utils/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../constants/colors';
import CardType from 'credit-card-type';
import {FONTS, FONT_SIZE} from '../constants/fonts';
import {Checkbox, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastModes} from '../enum/ToastModes';
import {addCard} from '../store/slices/cardsSlice';
import {AddCardsToStore} from '../utils/cardStoreUtils';

const AddCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const router = useRoute();
  const {amount} = router.params;
  const {height} = useWindowDimensions();
  const cards = useSelector(state => state.cards.value);

  const [card, setCard] = useState(
    router.params.card
      ? {...router.params.card, cvv: ''}
      : {number: '', name: '', expiry: '', cvv: '', postal: ''},
  );
  const [saveCard, setSaveCard] = useState(true);
  const [disableBtn, setDisableBtn] = useState(true);
  const [cardType, setCardType] = useState('generic');

  const onClickPay = () => {
    if (!card.number && card.number?.trim()?.length !== 16) {
      Toast.show({
        type: ToastModes.error,
        text1: 'Enter valid card number!',
      });
      setDisableBtn(true);
      return;
    } else if (card.name?.trim() === '') {
      Toast.show({
        type: ToastModes.error,
        text1: 'Enter holder name!',
      });
      setDisableBtn(true);
      return;
    } else if (card.cvv?.trim()?.length !== 3) {
      Toast.show({
        type: ToastModes.error,
        text1: 'Enter valid security code!',
      });
      setDisableBtn(true);
      return;
    } else if (card.postal?.trim() === '') {
      Toast.show({
        type: ToastModes.error,
        text1: 'Enter valid postal code!',
      });
      setDisableBtn(true);
      return;
    } else if (
      card.expiry?.trim() === '' ||
      !moment(card.expiry, 'MM/YY').isValid()
    ) {
      Toast.show({
        type: ToastModes.error,
        text1: 'Enter valid expiry date!',
      });
      setDisableBtn(true);
      return;
    } else {
      onPayment();
    }
  };

  const validateCardDetails = () => {
    if (card.number && card.number?.trim()?.length >= 4) {
      const cardParse = CardType(card.number);

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

  const onPayment = async () => {
    if (saveCard) {
      const isExist = cards.find(tmpCard => tmpCard.number === card.number);

      if (!isExist) {
        const newCards = [...cards, {...card, cvv: ''}];

        await AddCardsToStore(newCards);
        dispatch(addCard(card));
        Toast.show({type: ToastModes.success, text1: 'Card saved!'});
      }
    }

    navigation.navigate('Success', {amount});
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

    setCard({...card, expiry: textTemp});
  };

  useEffect(() => {
    validateCardDetails();
  }, [card]);

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
              value={card.name}
              onChangeText={value => setCard({...card, name: value})}
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
              value={card.number}
              placeholder="0000 0000 0000 0000"
              keyboardType="number-pad"
              onChangeText={value =>
                setCard({
                  ...card,
                  number: value
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
              <Text style={styles.headTxt}>Expiry date</Text>
              <TextInput
                mode="outlined"
                editable={!router.params?.card}
                outlineStyle={styles.textInputOutline}
                outlineColor={COLORS.TEXT_SECONDARY}
                value={card.expiry}
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

          <View>
            <Text style={styles.headTxt}>ZIP/Postal code</Text>
            <TextInput
              mode="outlined"
              editable={!router.params?.card}
              outlineStyle={styles.textInputOutline}
              outlineColor={COLORS.TEXT_SECONDARY}
              value={card.postal}
              onChangeText={value => setCard({...card, postal: value})}
              maxLength={10}
              style={[styles.textInputStyle]}
              selectionColor={COLORS.PRIMARY}
            />
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

          <View style={{marginTop: 5}}>
            <PrimaryButton
              disabled={disableBtn}
              text={`Pay $${amount}`}
              onPress={onClickPay}
            />
          </View>
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
    minHeight: 100,
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
