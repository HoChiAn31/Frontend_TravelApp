import { StyleSheet, Text, View } from "react-native";
import React from "react";
const ReusableBill = ({
  title,
  text,
  family,
  size,
  color,
  align,
  date,
  numberOfLines,
  width,
}) => {
  return (
    <View
      style={
        width
          ? {
              width: "50%",
            }
          : {
              paddingHorizontal: 4,
              marginVertical: 12,
            }
      }
    >
      <Text style={styles.textStyle}>{title}:</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default ReusableBill;

const styles = StyleSheet.create({
  container: {},
  // textStyle: (family, size, color, align) => ({
  //   fontFamily: family,
  //   fontSize: size,
  //   color: color,
  //   textAlign: align,
  // }),
  textStyle: {
    fontSize: 16,
    color: "#BBBBBB",
    marginBottom: 4,
  },
});
