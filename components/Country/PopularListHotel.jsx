import { FlatList, View } from "react-native";
import React from "react";
import ReusableTile from "../Reusable/ReusableTile";
import { useNavigation } from "@react-navigation/native";

const PopularListHotel = ({ data }) => {
  const navigation = useNavigation();
  // console.log(data);
  const renderItem = ({ item }) => (
    <View key={item._id} style={{ marginBottom: 10 }}>
      <ReusableTile
        item={item}
        onPress={() => navigation.navigate("HotelDetails", { item })}
      />
    </View>
  );

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default PopularListHotel;
