import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AppBar } from "../../../components";
import { COLORS } from "../../../constants/theme";
import { useEffect, useState } from "react";
import { useRefresh } from "../../../components/Provider/RefreshProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
function AddLocation({ navigation }) {
  const { setRefreshUpdate } = useRefresh();
  const [name, setName] = useState();
  const [countrySelect, setCountrySelect] = useState();
  const [isoCountryCode, setIsoCountryCode] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [location, setLocation] = useState();
  const [isAddCountry, setIsAddCountry] = useState(false);
  const [value, setValue] = useState(null);

  const [placesData, setPlacesData] = useState([]);
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  // console.log(countrySelect);
  const [country, setCountry] = useState();
  const fecthCountry = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/location`)
      .then((res) => res.json())
      .then((json) => {
        const newPlacesData = json.map((place) => ({
          country: place.country,
          country_id: place.country_id,
          isoCountryCode: place.isoCountryCode,
        }));

        // Filter out duplicates based on isoCountryCode
        const uniqueCountries = Array.from(
          new Set(newPlacesData.map((place) => place.isoCountryCode))
        ).map((isoCountryCode) =>
          newPlacesData.find((place) => place.isoCountryCode === isoCountryCode)
        );

        // Update state
        // setPlacesData(newPlacesData);

        setUniqueCountries(uniqueCountries);
        // setCountry(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchCountryTitle = () => {
    const newSelectOptions = uniqueCountries.map((country) => ({
      label: country.country,
      value: country.country,
    }));
    setSelectOptions(newSelectOptions);
  };
  useEffect(() => {
    fecthCountry();
  }, []);
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
  const handleAddLocation = () => {
    const selectedCountry = uniqueCountries.find(
      (country) => country.country === countrySelect
    );
    if (selectedCountry) {
      fetch("https://travel-app-tau-jet.vercel.app/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          location,
          description,
          image,
          country: selectedCountry.country,
          country_id: selectedCountry.country_id,
          isoCountryCode: selectedCountry.isoCountryCode,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setIsAddCountry(true);
        })
        .catch((err) => {
          console.log(err);
          alert("Add Country Failed");
        });
    }
  };

  const closeModal = () => {
    setIsAddCountry(false);
    setRefreshUpdate((prev) => prev + 1);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        extraScrollHeight={Platform.OS === "ios" ? 50 : 0}
      >
        <View style={{ marginTop: 20 }}>
          <AppBar
            title={"Add Location"}
            top={0}
            left={0}
            right={0}
            onPress={() => navigation.goBack()}
          />
          <View style={{ marginTop: 40 }}>
            <View style={styles.item}>
              <Text style={styles.title}>Name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Country:</Text>
              {/* <TextInput
                style={styles.input}
                value={isoCountryCode}
                onChangeText={(value) => setIsoCountryCode(value)}
              /> */}

              <View style={{ marginTop: -16 }}>
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
                    setCountrySelect(item.value);
                  }}
                />
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Location:</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={(value) => setLocation(value)}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Description:</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={(value) => setDescription(value)}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Image</Text>
              <View style={styles.image}>
                <TextInput
                  style={[styles.input, { width: "76%", marginRight: 12 }]}
                  value={image}
                  onChangeText={(value) => setImage(value)}
                />
                <Image
                  source={{
                    uri: `${image}`,
                  }}
                  height={60}
                  width={60}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddLocation}>
            <Text style={styles.textBtn}>Add Location</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddCountry}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Registration Successful!</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
export default AddLocation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  item: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
  },
  image: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  addBtn: {
    backgroundColor: COLORS.blueFacilities,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 12,
  },
  textBtn: {
    color: COLORS.white,
    fontSize: 20,
  },
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

  // Dropdown
  dropdown: {
    // margin: 16,
    marginVertical: 14,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
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
