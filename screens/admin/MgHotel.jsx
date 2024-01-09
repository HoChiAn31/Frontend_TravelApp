import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
  VirtualizedList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AppBar } from "../../components";
import { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import Country from "../../components/Tiles/Country/Country";
import ReusableTile from "../../components/Reusable/ReusableTile";
import ReusableTileCountry from "../../components/Reusable/ReusableTileCountry";
import { useRefresh } from "../../components/Provider/RefreshProvider";
import ReusableTileLocation from "../../components/Reusable/ReusableTileLocation";
import { Dropdown } from "react-native-element-dropdown";

function MgHotel({ navigation }) {
  const { refreshUpdate } = useRefresh();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(true);
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [filter, setFilter] = useState();
  useEffect(() => {
    fetch("https://travel-app-tau-jet.vercel.app/hotel")
      .then((res) => res.json())
      .then((json) => {
        setLocation(json);
        const newCountry = json.map((countries) => ({
          country: countries.country,
        }));
        const uniqueCountries = Array.from(
          new Set(newCountry.map((place) => place.country))
        ).map((country) =>
          newCountry.find((place) => place.country === country)
        );
        setUniqueCountries(uniqueCountries);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [refreshUpdate]);
  const fetchCountryTitle = () => {
    const newSelectOptions = uniqueCountries.map((country) => ({
      label: country.country,
      value: country.country,
    }));
    setSelectOptions(newSelectOptions);
  };
  useEffect(() => {
    if (uniqueCountries.length > 0) {
      fetchCountryTitle();
    }
  }, [uniqueCountries]);
  useEffect(() => {
    // console.log("placesData: ", placesData);
    // console.log("uniqueCountries", uniqueCountries);r
    // console.log("selectOptions", selectOptions);
  });
  const handleFilter = (value) => {
    // console.log(value);
    const filteredHotels = location.filter((hotel) => hotel.country === value);
    setFilter(filteredHotels);
  };
  useEffect(() => {
    // console.log("placesData: ", placesData);
    // console.log("uniqueCountries", uniqueCountries);
    // console.log("selectOptions", selectOptions);
    if (location && value) {
      handleFilter(value);
    }
  }, [refreshUpdate, location, value]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20 }}>
        <AppBar
          top={0}
          title={"Hotel"}
          left={0}
          right={0}
          onPress={() => navigation.goBack()}
        />
        <View style={{ marginTop: 20 }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={selectOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select country"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              handleFilter(item.value);
              // console.log(item.value);
            }}
          />
        </View>
        <View style={{ marginVertical: 28, height: 700 }}>
          <View>
            {loading ? (
              <View>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <FlatList
                data={filter ? filter : location}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 20 }}>
                    <ReusableTileLocation
                      paddingRight={80}
                      item={item}
                      onPress={() => navigation.navigate("EDHotel", { item })}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>
      <View style={{ marginTop: -64 }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blueFacilities,
            alignItems: "center",
            paddingVertical: 16,
            marginTop: 2,
            borderRadius: 4,
            marginHorizontal: 20,
          }}
          onPress={() => navigation.navigate("AddHotel")}
        >
          <Text style={{ color: COLORS.white, fontSize: SIZES.large }}>
            ADD HOTEL
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default MgHotel;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 35,
    paddingHorizontal: 30,
    paddingVertical: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdown: {
    // margin: 16,
    marginTop: 12,
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
