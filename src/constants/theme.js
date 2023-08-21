import { DefaultTheme } from "react-native-paper";
import { COLORS } from "./colors";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.PRIMARY,
    onPrimary: COLORS.PRIMARY,
  },
};
