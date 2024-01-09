import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

const ReusableIcon = ({ text, family, size, color, align, icon }) => {
  return (
    <View
      style={{
        // alignItems: "center",
        // marginHorizontal: 8,
        // width: 80,
        // marginVertical: 20,
        flexDirection: "row",
      }}
    >
      {icon === "location" ? (
        <Ionicons name="md-location-sharp" size={24} color="black" />
      ) : null}
      {icon === "city" ? (
        <MaterialIcons name="location-city" size={24} color="black" />
      ) : null}
      <Text
        // numberOfLines={numberOfLines}
        style={styles.textStyle(family, size, color, align)}
      >
        {text}
      </Text>
    </View>
  );
};

export default ReusableIcon;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    marginTop: 6,
    marginLeft: 6,
  }),
});
