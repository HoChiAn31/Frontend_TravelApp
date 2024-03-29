import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import {
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableText,
} from "../../../components/index";

const HotelCard = ({ item, margin, onPress }) => {
  return (
    <TouchableOpacity
      key={item._id}
      style={styles.card(margin)}
      onPress={onPress}
    >
      <View>
        <View style={styles.imageContainer}>
          <NetworkImage
            source={item.image}
            width={"90%"}
            height={"100%"}
            radius={16}
          />
        </View>

        <HeightSpacer height={5} />

        <View style={{ padding: 10 }}>
          <ReusableText
            text={item.title}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
            numberOfLines={2}
          />

          <HeightSpacer height={5} />

          <ReusableText
            text={item.location}
            family={"medium"}
            size={SIZES.medium - 2}
            color={COLORS.gray}
          />

          <HeightSpacer height={5} />

          <Rating rating={item.rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  card: (margin) => ({
    width: SIZES.width / 2.2,
    // height: 250,
    borderRadius: 16,
    backgroundColor: COLORS.lightWhite,
    marginRight: margin,
  }),
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    height: 150,
  },
});
