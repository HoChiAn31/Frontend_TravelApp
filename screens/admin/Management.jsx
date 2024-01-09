import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { AppBar } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const Management = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar title={`Management`} top={60} left={138} right={0} hideIcon />
      <View style={{ marginTop: 70, paddingHorizontal: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 8,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 12,
            marginBottom: 16,
          }}
          onPress={() => navigation.navigate("MgPlace")}
        >
          <Text style={{ fontSize: SIZES.xLarge }}>1. Place</Text>
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 8,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 12,
            marginBottom: 16,
          }}
          onPress={() => navigation.navigate("MgLocation")}
        >
          <Text style={{ fontSize: SIZES.xLarge }}>2. Location</Text>
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 8,
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 12,
            marginBottom: 16,
          }}
          onPress={() => navigation.navigate("MgHotel")}
        >
          <Text style={{ fontSize: SIZES.xLarge }}>3. Hotel</Text>
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Management;
