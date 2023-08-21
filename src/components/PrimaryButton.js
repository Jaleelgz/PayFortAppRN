import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS, FONT_SIZE } from "../constants/fonts";

const PrimaryButton = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, disabled ? styles.disabledBtn : styles.activeBtn]}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  activeBtn: { backgroundColor: COLORS.PRIMARY },
  disabledBtn: { backgroundColor: COLORS.DISABLED_D4 },
  btnTxt: {
    fontFamily: FONTS.InterBold,
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: "bold",
    color: COLORS.WHITE,
    textAlign: "center",
  },
});
