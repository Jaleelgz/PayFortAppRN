import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useWindowDimensions} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../utils/globalStyles';
import {COLORS} from '../constants/colors';
import {FONTS, FONT_SIZE} from '../constants/fonts';
import PrimaryButton from '../components/PrimaryButton';

const FailedPage = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const {amount} = router.params;
  const {height} = useWindowDimensions();

  const navigateToHome = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'Home'}],
    });
  };

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
        <View style={styles.container}>
          <MaterialIcons
            color={COLORS.TOAST_ERROR}
            size={50}
            name="error-outline"
          />
          <Text style={styles.successTxt}>Payment Failed!</Text>
          <Text style={styles.transactionTxt}>
            Transaction Number :{' '}
            {Math.floor(100000 + Math.random() * 90000000000)}
          </Text>
          <Text
            style={[
              styles.transactionTxt,
              {marginTop: 20, color: COLORS.GRAY},
            ]}>
            Amount : $ {amount}
          </Text>

          <View style={{marginTop: 20, width: '100%'}}>
            <PrimaryButton
              text={'Close'}
              disabled={false}
              onPress={navigateToHome}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FailedPage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  successTxt: {
    fontFamily: FONTS.InterBold,
    fontSize: FONT_SIZE.XBIG,
    fontWeight: 'bold',
    color: COLORS.TOAST_ERROR,
    marginTop: 10,
  },
  transactionTxt: {
    fontFamily: FONTS.InterMedium,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 5,
  },
});
