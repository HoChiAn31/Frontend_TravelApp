import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import reusable from "../Reusable/reusable.style";
import ReusableText from "../Reusable/ReusableText";
import { TEXT, COLORS, SIZES } from "../../constants/theme";
import ReusableTile from "../Reusable/ReusableTile";

const Recommendations = () => {
  const navigation = useNavigation();
  const [hotelData, setHotelData] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://travel-app-tau-jet.vercel.app/location`)
      .then((res) => res.json())
      .then((data) => {
        setHotelData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (hotelData) {
      const highRatedLocations = hotelData
        .filter((location) => location.rating >= 4.9)
        .sort((a, b) => b.rating - a.rating);
      setRecommendation(highRatedLocations);
    }
  }, [hotelData]);

  return (
    <View style={styles.container}>
      <View
        style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}
      >
        <ReusableText
          text={"Recommendations"}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Recommended")}>
          <Feather name="list" size={20} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={recommendation}
          horizontal
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ReusableTile
              item={item}
              onPress={() => navigation.navigate("PlaceDetails", { item })}
            />
          )}
        />
      )}
    </View>
  );
};

export default Recommendations;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});
