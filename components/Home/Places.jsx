import {
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import HeightSpacer from "../Reusable/HeightSpacer";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import Country from "../Tiles/Country/Country";
import ReusableText from "../Reusable/ReusableText";
import reusable from "../Reusable/reusable.style";
import { useNavigation } from "@react-navigation/native";

const Places = () => {
  const navigation = useNavigation();
  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://travel-app-tau-jet.vercel.app/country")
      .then((res) => res.json())
      .then((json) => {
        setCountry(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <View
        style={[reusable.rowWithSpace("space-between"), { paddingBottom: 20 }]}
      >
        <ReusableText
          text={"Places"}
          family={"medium"}
          size={TEXT.large}
          color={COLORS.black}
        />

        <TouchableOpacity onPress={() => navigation.navigate("PlaceList")}>
          <Feather name="list" size={20} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <VirtualizedList
          data={country}
          horizontal
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          initialNumberToRender={2}
          getItemCount={(data) => 7}
          renderItem={({ item, index }) => (
            <View style={{ marginRight: SIZES.medium }}>
              <Country item={item} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Places;

const styles = StyleSheet.create({});
