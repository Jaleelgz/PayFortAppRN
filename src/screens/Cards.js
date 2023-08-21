import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GlobalStyles, ScreenPadding} from '../utils/globalStyles';
import CardType from 'credit-card-type';
import {FlatList} from 'react-native';
import {Card, RadioButton} from 'react-native-paper';
import PrimaryButton from '../components/PrimaryButton';
import {COLORS} from '../constants/colors';
import {PaymentIcon} from 'react-native-payment-icons';
import {FONTS, FONT_SIZE} from '../constants/fonts';

const Cards = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const cards = useSelector(state => state.cards.value);
  const {amount} = route?.params;

  const [selectedCard, setSelectedCard] = useState({});

  const RenderCard = ({item}) => {
    const cardParse = CardType(item.number);

    return (
      <Card
        onPress={() => setSelectedCard(item)}
        style={{
          backgroundColor: COLORS.WHITE,
          elevation: 0,
          padding: ScreenPadding,
          borderWidth: 1,
          borderColor:
            selectedCard?.number === item?.number
              ? COLORS.PRIMARY
              : COLORS.DISABLED_D4,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <RadioButton
            value={item.number}
            status={
              selectedCard?.number === item?.number ? 'checked' : 'unchecked'
            }
            onPress={() => setSelectedCard(item)}
          />

          <PaymentIcon type={cardParse[0]?.type ?? 'generic'} width={50} />

          <View>
            <Text
              style={[
                styles.cardNumber,
                {color: COLORS.GRAY, fontSize: FONT_SIZE.MEDIUM},
              ]}>
              {item.name}
            </Text>
            <Text style={styles.cardNumber}>{item.number}</Text>
            <Text style={styles.cardNumber}>{item.expiry}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={[GlobalStyles.screen, GlobalStyles.appBarHeightMargin]}>
      <Text style={GlobalStyles.screenHeadTxt}>Saved Cards</Text>
      <Text style={GlobalStyles.screenSubTxt}>Select a card to pay</Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cards}
        ItemSeparatorComponent={() => (
          <View style={{width: '100%', height: 10}} />
        )}
        renderItem={({item}) => <RenderCard item={item} />}
        keyExtractor={item => item.number}
        style={{marginVertical: 15, flex: 1}}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddCard', {amount})}
        style={styles.addCardBtn}>
        <MaterialIcons name="add" color={COLORS.PRIMARY} size={24} />
        <Text style={styles.addCardTxt}>Add new card</Text>
      </TouchableOpacity>

      <PrimaryButton
        disabled={!selectedCard?.number}
        text={'Continue'}
        onPress={() =>
          navigation.navigate('AddCard', {amount, card: selectedCard})
        }
      />
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  cardNumber: {
    fontFamily: FONTS.InterMedium,
    color: COLORS.TEXT_SECONDARY,
    fontSize: FONT_SIZE.NORMAL,
  },
  addCardBtn: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
  },
  addCardTxt: {
    fontFamily: FONTS.InterMedium,
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
});
