import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from './colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ToastModes} from '../enum/ToastModes';
import {FONTS} from './fonts';

export const ToastConfig = {
  [ToastModes.success]: ({text1, ...props}) => (
    <View
      style={[styles.toastContainer, {backgroundColor: COLORS.TOAST_SUCCESS}]}>
      <AntDesign color={'#fff'} size={15} name="checkcircle" />
      <Text style={[styles.toastTxt]}>{text1}</Text>
    </View>
  ),

  [ToastModes.info]: ({text1, ...props}) => (
    <View style={[styles.toastContainer, {backgroundColor: COLORS.TOAST_INFO}]}>
      <MaterialIcons color={'#fff'} size={15} name="info" />
      <Text style={[styles.toastTxt]}>{text1}</Text>
    </View>
  ),

  [ToastModes.warning]: ({text1, ...props}) => (
    <View
      style={[styles.toastContainer, {backgroundColor: COLORS.TOAST_WARNING}]}>
      <Ionicons color={'#fff'} size={15} name="warning" />
      <Text style={[styles.toastTxt]}>{text1}</Text>
    </View>
  ),

  [ToastModes.error]: ({text1, ...props}) => (
    <View
      style={[styles.toastContainer, {backgroundColor: COLORS.TOAST_ERROR}]}>
      <MaterialIcons color={'#fff'} size={15} name="error" />
      <Text style={[styles.toastTxt]}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 3,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20000,
  },
  toastTxt: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
  },
});
