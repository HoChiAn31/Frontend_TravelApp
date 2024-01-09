import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../../constants/theme";

const ReusableBtnIcon = ({
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
      {icon === "location" ? (
        <Ionicons name="md-location-sharp" size={24} color="black" />
      ) : null}
      {icon === "city" ? (
        <MaterialIcons name="location-city" size={24} color="black" />
      ) : null}
      <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtnIcon;

const styles = StyleSheet.create({
  btnText: (textColor) => ({
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: textColor,
    paddingLeft: 6,
  }),
  btnStyle: (width, backgroundColor, borderWidth, borderColor) => ({
    width: width,
    backgroundColor: backgroundColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // minWidth: 45,
    borderRadius: SIZES.small,
    borderColor: borderColor,
    borderWidth: borderWidth,
    paddingHorizontal: 6,
    paddingVertical: 4,
  }),
});
