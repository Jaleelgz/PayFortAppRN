import {StatusBar, StyleSheet} from 'react-native';
import {FONTS} from '../constants/fonts';
import {COLORS} from '../constants/colors';

export const ScreenPadding = 12;

export const GlobalStyles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    flex: 1,
    padding: ScreenPadding,
    backgroundColor: COLORS.WHITE,
  },
  appBarHeightMargin: {
    marginTop: 0,
  },
  screenHeadTxt: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 24,
    color: COLORS.GRAY,
    letterSpacing: -0.408,
    fontFamily: FONTS.InterBold,
  },
  screenSubTxt: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    color: COLORS.GRAY,
    letterSpacing: -0.408,
    marginTop: 5,
    fontFamily: FONTS.InterRegular,
  },
});
