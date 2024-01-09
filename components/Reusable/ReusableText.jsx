import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
const ReusableText = ({
  text,
  family,
  size,
  color,
  align,
  date,
  numberOfLines,
}) => {
  const formattedTime = moment(date).format("YYYY-MM-DD");
  return (
    <Text
      numberOfLines={numberOfLines}
      style={styles.textStyle(family, size, color, align)}
    >
      {date ? formattedTime : text}
    </Text>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
  }),
});
