import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import reusable from "../../components/Reusable/reusable.style";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ReusableText from "./ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";

const AppBar = ({
  color,
  title,
  color1,
  colorTitle,
  colorIcon,
  colorIcon1,
  icon,
  onPress,
  onPress1,
  top,
  left,
  right,
  hideIcon,
  iconTrash,
  iconHeart,
}) => {
  return (
    <View style={styles.overlay(top, left, right)}>
      <View style={reusable.rowWithSpace("space-between")}>
        {hideIcon ? null : (
          <TouchableOpacity style={styles.box(color)} onPress={onPress}>
            <AntDesign name="left" size={26} color={colorIcon} />
          </TouchableOpacity>
        )}

        <ReusableText
          text={title}
          family={"medium"}
          size={TEXT.large}
          color={colorTitle ? colorTitle : COLORS.black}
        />

        <TouchableOpacity style={styles.box1(color1)} onPress={onPress1}>
          {iconTrash ? (
            <FontAwesome
              name="trash"
              size={SIZES.xLarge + 3}
              color={colorIcon1}
            />
          ) : iconHeart ? (
            <FontAwesome name={iconHeart} size={30} color={colorIcon1} />
          ) : (
            <AntDesign name={icon} size={26} color={colorIcon1} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  overlay: (top, left, right) => ({
    position: "absolute",
    top: top,
    left: left,
    right: right,
    justifyContent: "center",
  }),
  box: (color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  }),
  box1: (color1) => ({
    backgroundColor: color1,
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  }),
});
