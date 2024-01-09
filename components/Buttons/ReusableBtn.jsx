import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../../constants/theme";

const ReusableBtn = ({
  onPress,
  btnText,
  textColor,
  width,
  backgroundColor,
  borderWidth,
  borderColor,
  style,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        style
          ? [
              styles.btnStyle(width, backgroundColor, borderWidth, borderColor),
              style,
            ]
          : styles.btnStyle(width, backgroundColor, borderWidth, borderColor)
      }
    >
      <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  btnText: (textColor) => ({
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: textColor,
  }),
  btnStyle: (width, backgroundColor, borderWidth, borderColor) => ({
    width: width,
    backgroundColor: backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderRadius: SIZES.small,
    borderColor: borderColor,
    borderWidth: borderWidth,
  }),
});
