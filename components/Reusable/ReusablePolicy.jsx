import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableText from "./ReusableText";
const ReusablePolicy = ({
  title,
  text,

  family,
  size,
  color,
  align,
  date,
  numberOfLines,
}) => {
  return (
    // <Text
    //   numberOfLines={numberOfLines}
    //   style={styles.textStyle(family, size, color, align)}
    // >
    //   {date ? formattedTime : text}
    // </Text>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default ReusablePolicy;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: SIZES.large,
  },
  textStyle: (family, size, color, align) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
  }),
});
