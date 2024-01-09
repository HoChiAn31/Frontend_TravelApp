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
import { AppBar } from "../../../components";
import { COLORS } from "../../../constants/theme";
import { useState } from "react";
import { useRefresh } from "../../../components/Provider/RefreshProvider";
function AddPlace({ navigation }) {
  const { setRefreshUpdate } = useRefresh();
  const [name, setName] = useState();
  const [isoCountryCode, setIsoCountryCode] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [region, setRegion] = useState();
  const [isAddCountry, setIsAddCountry] = useState(false);
  const handleAddCountry = () => {
    fetch("https://travel-app-tau-jet.vercel.app/country", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        isoCountryCode,
        description,
        image,
        region,
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
  };
  const closeModal = () => {
    setIsAddCountry(false);
    setRefreshUpdate((prev) => prev + 1);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <AppBar
          title={"Add Country"}
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
            <Text style={styles.title}>Iso Country Code:</Text>
            <TextInput
              style={styles.input}
              value={isoCountryCode}
              onChangeText={(value) => setIsoCountryCode(value)}
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
          <View style={styles.item}>
            <Text style={styles.title}>Region:</Text>
            <TextInput
              style={styles.input}
              value={region}
              onChangeText={(value) => setRegion(value)}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddCountry}>
          <Text style={styles.textBtn}>Add Country</Text>
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
    </SafeAreaView>
  );
}
export default AddPlace;
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
});
