import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  NetworkImage,
  AppBar,
  HeightSpacer,
  ReusableText,
  DescriptionText,
  ReusableBtn,
  PopularList,
} from "../../components/index";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import PopularListHotel from "../../components/Country/PopularListHotel";

const PlaceDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [popularHotel, setPopularHotel] = useState();
  const [popularHotelList, setPopularHotelList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://travel-app-tau-jet.vercel.app/hotel/categories/${item.isoCountryCode}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPopularHotel(json.slice(0, 2));
        setPopularHotelList(json);
        // console.log(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  if (popularHotel) {
    console.log("popularHotel: ", popularHotel);
  }
  // if (popularHotelList) {
  //   console.log(popularHotelList);
  // }
  return (
    <ScrollView>
      <View>
        <NetworkImage
          source={item.image}
          width={"100%"}
          height={350}
          radius={30}
        />

        <AppBar
          top={40}
          left={20}
          right={20}
          title={item.title}
          color={COLORS.white}
          icon={"search1"}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate("Search")}
        />
      </View>

      <View style={styles.description}>
        <HeightSpacer height={15} />
        <ReusableText
          text={item.location}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />

        <DescriptionText text={item.description} />

        <View style={{ alignContent: "center" }}>
          <HeightSpacer height={20} />

          <View style={reusable.rowWithSpace("space-between")}>
            <ReusableText
              text={"Popular Hotels"}
              family={"medium"}
              size={TEXT.large}
              color={COLORS.black}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("HotelList", { item })}
            >
              <Feather name="list" size={20} />
            </TouchableOpacity>
          </View>

          <HeightSpacer height={20} />
          {loading ? (
            <View>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <PopularListHotel data={popularHotel} />
          )}
          <ReusableBtn
            onPress={() => navigation.navigate("HotelSearch", { item })}
            btnText={"Find Best Hotels"}
            width={SIZES.width - 40}
            backgroundColor={COLORS.blueFacilities}
            borderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
          <HeightSpacer height={50} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 20,
  },
});
