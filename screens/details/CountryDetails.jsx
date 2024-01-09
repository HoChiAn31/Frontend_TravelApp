import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  NetworkImage,
  AppBar,
  HeightSpacer,
  ReusableText,
  DescriptionText,
  PopularList,
} from "../../components/index";
import { COLORS, TEXT, SIZES } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";

const CountryDetails = ({ navigation }) => {
  const route = useRoute();

  const { item } = route.params;
  const [locationData, setLocationData] = useState();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://travel-app-tau-jet.vercel.app/location")
      .then((res) => res.json())
      .then((json) => {
        setLocationData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const loadLocation = () => {
    const locationId = locationData.filter(
      (locations) => locations.country_id === item._id
    );
    setLocation(locationId.slice(0, 2));
  };
  useEffect(() => {
    if (!loading) {
      loadLocation();
    }
  }, [loading]);

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
          title={item.name}
          color={COLORS.white}
          icon={"search1"}
          color1={COLORS.white}
          onPress={() => navigation.goBack()}
          onPress1={() => navigation.navigate("Search")}
        />
      </View>

      <View style={styles.description}>
        <ReusableText
          text={item.region}
          family={"medium"}
          size={TEXT.xLarge}
          color={COLORS.black}
        />

        <DescriptionText text={item.description} />

        <View style={{ alignContent: "center" }}>
          <HeightSpacer height={20} />

          <View style={reusable.rowWithSpace("space-between")}>
            <ReusableText
              text={"Popular Destinations"}
              family={"medium"}
              size={TEXT.large}
              color={COLORS.black}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("CountryList", { item })}
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
            <PopularList data={location} />
          )}

          <HeightSpacer height={50} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CountryDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F8",
  },
  description: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
});
