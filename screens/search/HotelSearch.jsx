import { View, Image, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./search.style";
import { COLORS } from "../../constants/theme";
import { AppBar, HeightSpacer } from "../../components";
import HotelCard from "../../components/Tiles/Hotels/HotelCard";

const HotelSearch = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [hotelData, setHotelData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://travel-app-tau-jet.vercel.app/hotel/categories/${item.isoCountryCode}`
    )
      .then((res) => res.json())
      .then((json) => {
        const filteredData = json.filter((hotel) => hotel.rating >= 4.5);
        const sortedData = filteredData.sort((a, b) => b.rating - a.rating);
        setHotelData(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView>
      <View style={{ height: 50 }}>
        <AppBar
          top={10}
          left={20}
          right={20}
          title={"Best hotels"}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>

      {loading ? (
        <View>
          <HeightSpacer height={"20%"} />
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <View style={{ paddingLeft: 12 }}>
          <FlatList
            data={hotelData}
            keyExtractor={(item) => item._id}
            numColumns={2}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            renderItem={({ item }) => (
              <HotelCard
                item={item}
                margin={10}
                onPress={() => navigation.navigate("HotelDetails", { item })}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HotelSearch;
