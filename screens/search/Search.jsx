import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import reusable from "../../components/Reusable/reusable.style";
import styles from "./search.style";
import { COLORS } from "../../constants/theme";
import { HeightSpacer } from "../../components";
import ReusableTile from "../../components/Reusable/ReusableTile";
import ReusableBtnIcon from "../../components/Buttons/ReusableBtnIcon";
const data = [
  { label: "Location", value: "Location" },
  { label: "Hotel", value: "Hotel" },
];
const Search = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [hotelData, setHotelData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [value, setValue] = useState(null);
  useEffect(() => {
    fetch(`https://travel-app-tau-jet.vercel.app/hotel`)
      .then((res) => res.json())
      .then((json) => {
        setHotelData(json);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://travel-app-tau-jet.vercel.app/location`)
      .then((res) => res.json())
      .then((json) => {
        setLocationData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (hotelData && locationData) {
      setSearchData([...hotelData, ...locationData]);
    }
  }, [hotelData, locationData]);

  const handleSearch = () => {
    const results = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        item.country.toLowerCase().includes(searchKey.toLowerCase())
    );
    setSearchResults(results);
  };
  useEffect(() => {
    if (searchKey.trim() !== "") {
      handleSearch();
    } else {
      setSearchResults([]);
      setSearchError(null);
    }
  }, [searchKey]);
  const handleClear = () => {
    setSearchKey("");
    setSearchResults([]);
    setSearchError(null);
    setFilterResults("");
  };

  const handleFilterLocation = () => {
    const filteredLocations = searchResults.filter((hotel) => {
      const locationLowerCase = hotel.title.toLowerCase();
      return (
        !locationLowerCase.includes("hotel") &&
        !locationLowerCase.includes("villa") &&
        !locationLowerCase.includes("central") &&
        !locationLowerCase.includes("garden")
      );
    });
    setFilterResults(filteredLocations);
  };
  const handleFilterHotel = () => {
    const filteredHotels = searchResults.filter((hotel) => {
      const titleLowerCase = hotel.title.toLowerCase();
      return (
        titleLowerCase.includes("hotel") ||
        titleLowerCase.includes("villa") ||
        titleLowerCase.includes("central") ||
        titleLowerCase.includes("garden")
      );
    });
    setFilterResults(filteredHotels);
  };
  // const handleFilter = (value) => {
  //   console.log(value);
  //   if (value === "Location") {
  //     handleFilterLocation();
  //   } else if (value === "Hotel") {
  //     handleFilterHotel();
  //   }
  // };
  return (
    <SafeAreaView style={reusable.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.input}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="Where do you want to visit"
          />
        </View>

        {searchKey.length > 0 ? (
          <TouchableOpacity style={styles.searchBtn} onPress={handleClear}>
            {/* <Feather name="search" size={24} color={COLORS.white} /> */}
            <MaterialIcons name="cancel" size={24} color={COLORS.lightBlue} />
          </TouchableOpacity>
        ) : null}
      </View>
      {searchKey.length > 0 ? (
        <View style={styles.filter}>
          <ReusableBtnIcon
            btnText={"Location"}
            backgroundColor={"#fff"}
            style={{ borderRadius: 4 }}
            icon={"location"}
            onPress={handleFilterLocation}
          />
          <ReusableBtnIcon
            btnText={"Hotel"}
            backgroundColor={"#fff"}
            style={{ borderRadius: 4 }}
            icon={"city"}
            onPress={handleFilterHotel}
          />
        </View>
      ) : // <View style={{ marginTop: -16 }}>
      //   <Dropdown
      //     style={styles.dropdown}
      //     placeholderStyle={styles.placeholderStyle}
      //     selectedTextStyle={styles.selectedTextStyle}
      //     inputSearchStyle={styles.inputSearchStyle}
      //     iconStyle={styles.iconStyle}
      //     data={data}
      //     maxHeight={300}
      //     labelField="label"
      //     valueField="value"
      //     placeholder="Select item"
      //     searchPlaceholder="Search..."
      //     value={value}
      //     onChange={(item) => {
      //       handleFilter(item.value);
      //       setValue(item.value);
      //     }}
      //   />
      // </View>
      null}
      {searchResults.length === 0 ? (
        <View>
          <HeightSpacer height={"20%"} />
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={filterResults.length > 0 ? filterResults : searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.tile}>
              <ReusableTile
                item={item}
                onPress={() => navigation.navigate("PlaceDetails", { item })}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
