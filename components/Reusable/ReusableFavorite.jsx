import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import reusable from "./reusable.style";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import {
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableText,
  WidthSpacer,
} from "../../components/index";
import { removeProductFavorite } from "../../screens/Favourite/FavoriteStore";

const ReusableFavorite = ({ item, onPress, roomName }) => {
  const dispatch = useDispatch();
  const id = item._id;
  const favorites = useSelector((state) => state.favorite.items);
  useEffect(() => {
    console.log("favorites", favorites);
  }, [favorites]);

  // useEffect(() => {
  //   console.log(item._id);
  // }, [item]);

  const trashProduct = () => {
    Alert.alert("Thông báo !", "Bạn có chắc chắn muốn xoá ?", [
      {
        text: "Huỷ",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: () => {
          dispatch(removeProductFavorite(id));
        },
      },
    ]);
  };

  const onFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <TouchableOpacity key={item._id} style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace("flex-start")}>
        <NetworkImage source={item.image} width={80} height={80} radius={12} />

        <WidthSpacer width={15} />

        <View style={{ paddingRight: 100 }}>
          <ReusableText
            text={item.title}
            family={"medium"}
            size={SIZES.medium}
            color={COLORS.black}
            numberOfLines={2}
          />
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
      <TouchableOpacity
        onPress={trashProduct}
        style={{
          position: "absolute",
          right: 30,
          top: "50%",
          padding: 10,
        }}
      >
        <FontAwesome name="trash" size={SIZES.xLarge + 3} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ReusableFavorite;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
