import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import reusable from "./reusable.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableText,
  WidthSpacer,
} from "../../components/index";

const ReusableTile = ({ item, onPress, roomName, paddingRight }) => {
  return (
    <TouchableOpacity key={item._id} style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace("flex-start")}>
        <NetworkImage source={item.image} width={80} height={80} radius={12} />

        <WidthSpacer width={15} />

        <View style={{ paddingRight: paddingRight }}>
          <View style={{ width: 240 }}>
            <ReusableText
              text={item.title}
              family={"medium"}
              size={SIZES.medium}
              color={COLORS.black}
              numberOfLines={2}
            />
          </View>
          <HeightSpacer height={8} />

          <ReusableText
            text={roomName ? item.room_name : item.location}
            family={"medium"}
            size={14}
            color={COLORS.gray}
          />

          <HeightSpacer height={8} />

          <View style={reusable.rowWithSpace("flex-start")}>
            <Rating rating={item.rating} />
            <WidthSpacer width={5} />
            <ReusableText
              text={` (${item.review} Views) `}
              family={"medium"}
              size={14}
              color={COLORS.gray}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableTile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
