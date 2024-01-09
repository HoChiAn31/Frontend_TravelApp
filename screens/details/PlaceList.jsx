import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppBar from "../../components/Reusable/AppBar";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableTile from "../../components/Reusable/ReusableTile";
import { useLocation } from "../../components/Provider/LocationProvider";
import ReusableTileCountry from "../../components/Reusable/ReusableTileCountry";

const PlaceList = ({ navigation }) => {
  const route = useRoute();
  //   const { item } = route.params;
  // console.log(item);
  const { isoCountryCode } = useLocation();
  const [hotelData, setHotelData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://travel-app-tau-jet.vercel.app/country`)
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

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <View style={{ height: 50 }}>
        <AppBar
          top={10}
          left={0}
          right={0}
          title={"Places List"}
          color={COLORS.white}
          icon={"search1"}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate("Search")}
        />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ paddingTop: 20, marginBottom: 24 }}>
          <FlatList
            data={hotelData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <ReusableTileCountry
                  paddingRight={80}
                  item={item}
                  onPress={() =>
                    navigation.navigate("CountryDetails", { item })
                  }
                />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PlaceList;
