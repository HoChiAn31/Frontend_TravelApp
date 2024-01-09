import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { COLORS, SIZES } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";

const ReusableHelp = ({ title, text }) => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleTitlePress = () => {
    setIsTextVisible(!isTextVisible);
  };
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <TouchableOpacity onPress={handleTitlePress}>
        <Text style={styles.title}>{title}</Text>
        <AntDesign
          name={isTextVisible ? "down" : "up"}
          size={20}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      {isTextVisible && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default ReusableHelp;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: "#fff",
    paddingLeft: 10,

    paddingVertical: 4,
    borderRadius: 4,
  },
  title: {
    fontSize: SIZES.medium - 2,
    paddingRight: 50,
    paddingVertical: 6,
  },
  icon: {
    position: "absolute",
    top: 2,
    right: 16,
  },
  text: {
    marginTop: 6,
    fontSize: SIZES.medium - 2,
  },
  textStyle: (family, size, color, align) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
  }),
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
