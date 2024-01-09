import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import HotelCard from "../Tiles/Hotels/HotelCard";
import { useLocation } from "../Provider/LocationProvider";
const BestHotels = () => {
  const navigation = useNavigation();
  const { isoCountryCode } = useLocation();
  const [hotelData, setHotelData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isoCountryCode) {
      fetch(
        `https://travel-app-tau-jet.vercel.app/hotel/categories/${isoCountryCode}`
      )
        .then((res) => res.json())
        .then((data) => {
          setHotelData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [isoCountryCode]);

  return (
    <View>
      <View
        style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}
      >
        <ReusableText
          text={"Nearby Hotels"}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("NearByHotelList")}
        >
          <Feather name="list" size={20} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={hotelData}
          horizontal
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          renderItem={({ item }) => (
            <HotelCard
              item={item}
              margin={10}
              onPress={() => navigation.navigate("HotelDetails", { item })}
            />
          )}
        />
      )}
    </View>
  );
};

export default BestHotels;

const styles = StyleSheet.create({});
