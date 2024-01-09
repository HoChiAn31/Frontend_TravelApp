import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/Reusable/AppBar";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableTile from "../../components/Reusable/ReusableTile";
import { useRoute } from "@react-navigation/native";

const CountryList = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [hotelData, setHotelData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://travel-app-tau-jet.vercel.app/location/categories/${item.isoCountryCode}`
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
  }, []);

  return (
    <SafeAreaView style={{ marginHorizontal: 20 }}>
      <View style={{ height: 50 }}>
        <AppBar
          top={10}
          left={0}
          right={0}
          title={"Location List"}
          color={COLORS.white}
          icon={"search1"}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate("HotelSearch")}
        />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ paddingTop: 20 }}>
          <FlatList
            data={hotelData}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <ReusableTile
                  item={item}
                  onPress={() => navigation.navigate("HotelDetails", { item })}
                />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CountryList;
