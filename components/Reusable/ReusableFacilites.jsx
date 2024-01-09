import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

const ReusableFacilites = ({ title, family, size, color, align, icon }) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginHorizontal: 8,
        width: 80,
        marginVertical: 20,
      }}
    >
      {icon === "parking" ? (
        <FontAwesome5 name="parking" size={24} color={COLORS.blueFacilities} />
      ) : null}
      {icon === "wifi" ? (
        <FontAwesome5 name="wifi" size={24} color={COLORS.blueFacilities} />
      ) : null}
      {icon === "restaurant" ? (
        <MaterialIcons
          name="restaurant"
          size={24}
          color={COLORS.blueFacilities}
        />
      ) : null}
      {icon === "hours-24" ? (
        <MaterialCommunityIcons
          name="hours-24"
          size={24}
          color={COLORS.blueFacilities}
        />
      ) : null}
      <Text
        // numberOfLines={numberOfLines}
        style={styles.textStyle(family, size, color, align)}
      >
        {title}
      </Text>
    </View>
  );
};

export default ReusableFacilites;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    marginTop: 6,
  }),
});

{
  /* <FontAwesome5 name="parking" size={24} color="black" />
<FontAwesome5 name="wifi" size={24} color="black" />
<MaterialIcons name="restaurant" size={24} color="black" />
<MaterialCommunityIcons name="hours-24" size={24} color="black" /> */
}
