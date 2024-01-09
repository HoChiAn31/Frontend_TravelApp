import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
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

const ReusableTileRoom = ({ item, onPress, noPrice }) => {
  return (
    <TouchableOpacity key={item._id} style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace("flex-start")}>
        <NetworkImage source={item.image} width={80} height={80} radius={12} />

        <WidthSpacer width={15} />

        <View>
          <ReusableText
            text={item.room_name}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={8} />

          {/* <ReusableText
            text={item.hotel_name}
            family={"medium"}
            size={14}
            color={COLORS.gray}
          /> */}

          <View style={reusable.rowWithSpace("flex-start")}>
            <MaterialCommunityIcons
              name="bed-double-outline"
              size={24}
              color="black"
            />
            {/* <Rating rating={item.rating} />
            <WidthSpacer width={5} /> */}
            <ReusableText
              text={item.description}
              family={"medium"}
              size={12}
              color={COLORS.gray}
            />
            <WidthSpacer width={36} />
            <FontAwesome name="shower" size={16} color="black" />
            <ReusableText
              text={" Shower"}
              family={"medium"}
              size={12}
              color={COLORS.gray}
            />
          </View>
          <HeightSpacer height={8} />
          <View style={reusable.rowWithSpace("flex-start")}>
            <MaterialCommunityIcons
              name="air-conditioner"
              size={18}
              color="black"
            />
            <ReusableText
              text={" Air-conditioner"}
              family={"medium"}
              size={12}
              color={COLORS.gray}
            />
            <WidthSpacer width={16} />
            <Ionicons name="ios-wifi" size={24} color="black" />
            <ReusableText
              text={" Free Wifi"}
              family={"medium"}
              size={12}
              color={COLORS.gray}
            />
          </View>
          <HeightSpacer height={8} />
          {noPrice ? null : (
            <View style={reusable.rowWithSpace("flex-start")}>
              <ReusableText
                text={`$ ${item.price}`}
                family={"medium"}
                size={18}
                color={COLORS.gray}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableTileRoom;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
