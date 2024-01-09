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
function EDPlace({ navigation, route }) {
  const { setRefreshUpdate } = useRefresh();
  const { item } = route.params;

  // console.log(item._id);
  const [name, setName] = useState(item.name);
  const [isoCountryCode, setIsoCountryCode] = useState(item.isoCountryCode);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [region, setRegion] = useState(item.region);
  const [isUpdateCountry, setIsUpdateCountry] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isDeleteCountry, setDeleteCountry] = useState(false);
  const handleUpdateCountry = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/country/${item._id}`, {
      method: "PATCH",
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
        setIsUpdateCountry(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Update Country Failed");
      });
  };
  const handleConfirmDelete = () => {
    setIsConfirmDelete(true);
  };
  const closeModalConfirm = () => {
    setIsConfirmDelete(false);
  };
  const handleDeleteCountry = () => {
    setIsConfirmDelete(false);
    fetch(`https://travel-app-tau-jet.vercel.app/country/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setDeleteCountry(true);
      })
      .catch((err) => {
        console.log(err);
        setDeleteCountry(true);
      });
  };

  const closeModal = () => {
    setIsUpdateCountry(false);
    setDeleteCountry(false);
    setRefreshUpdate((prev) => prev + 1);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <AppBar
          title={"Country Details"}
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
        <TouchableOpacity style={styles.addBtn} onPress={handleUpdateCountry}>
          <Text style={styles.textBtn}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={handleConfirmDelete}
        >
          <Text style={styles.textBtn}>Delete</Text>
        </TouchableOpacity>
      </View>
      {/* Modal Update Successful! */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUpdateCountry}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Successful!</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal Confirm Delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmDelete}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete?
            </Text>
            <View style={styles.modalBtnConfirm}>
              <Pressable
                style={[styles.buttonConfirm, { backgroundColor: COLORS.red }]}
                onPress={handleDeleteCountry}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonConfirm]}
                onPress={closeModalConfirm}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal Delete Successful! */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteCountry}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Delete Successful!</Text>

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
export default EDPlace;
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

  deleteBtn: {
    marginTop: 12,
    backgroundColor: COLORS.red,
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
  buttonConfirm: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 5,
    backgroundColor: "#2196F3",
    marginHorizontal: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalBtnConfirm: {
    flexDirection: "row",
  },
});
