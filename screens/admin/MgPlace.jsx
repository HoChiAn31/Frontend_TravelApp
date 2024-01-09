import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
  VirtualizedList,
  TouchableOpacity,
} from "react-native";
import { AppBar } from "../../components";
import { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import Country from "../../components/Tiles/Country/Country";
import ReusableTile from "../../components/Reusable/ReusableTile";
import ReusableTileCountry from "../../components/Reusable/ReusableTileCountry";
import { useRefresh } from "../../components/Provider/RefreshProvider";

function MgPlace({ navigation }) {
  const { refreshUpdate } = useRefresh();
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
  }, [refreshUpdate]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20 }}>
        <AppBar
          top={0}
          title={"Place"}
          left={0}
          right={0}
          onPress={() => navigation.goBack()}
        />
        <View style={{ marginVertical: 36 }}>
          <View>
            {loading ? (
              <View>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <FlatList
                data={country}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 20 }}>
                    <ReusableTileCountry
                      paddingRight={80}
                      item={item}
                      onPress={() => navigation.navigate("EDPlace", { item })}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
      <View style={{ marginTop: -48 }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blueFacilities,
            alignItems: "center",
            paddingVertical: 16,
            marginTop: 2,
            borderRadius: 4,
            marginHorizontal: 20,
          }}
          onPress={() => navigation.navigate("AddPlace")}
        >
          <Text style={{ color: COLORS.white, fontSize: SIZES.large }}>
            ADD COUNTRY
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default MgPlace;
