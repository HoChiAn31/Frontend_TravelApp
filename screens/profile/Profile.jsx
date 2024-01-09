import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Modal } from "react-native-paper";
import { useAuth } from "../../components/Provider/AuthProvider";
import { AppBar, HeightSpacer, ReusableBtn } from "../../components";
import styles from "./profile.style";
import { COLORS } from "../../constants/theme";
const imageList = [
  {
    id: 1,
    uri: "https://bizweb.dktcdn.net/100/438/408/files/avatar-buon-cho-nam-5.jpg?v=1699239596384",
  },
  {
    id: 2,
    uri: "https://i.9mobi.vn/cf/Images/np/2022/10/13/anh-dai-dien-dep-cute-7.jpg",
  },
  {
    id: 3,
    uri: "https://i.9mobi.vn/cf/Images/np/2022/10/13/anh-dai-dien-dep-cute-21.jpg",
  },
  {
    id: 4,
    uri: "https://haycafe.vn/wp-content/uploads/2021/12/Anh-avatar-nam-chibi-ngau-loi.jpg",
  },
  {
    id: 6,
    uri: "https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-52-28-16-28-10.jpg",
  },
  {
    id: 7,
    uri: "https://1.bp.blogspot.com/-MbasJa-97Rc/WmYaJL6kOHI/AAAAAAAAivE/fBT9aTv8x5wJL6lTbau2f4nXiFrjeRqeACLcBGAs/s1600/18881967_131782964052220_5128435195745790304_n.jpg",
  },
  {
    id: 8,
    uri: "https://i.9mobi.vn/cf/Images/np/2022/10/13/anh-dai-dien-dep-cute-11.jpg",
  },
  {
    id: 9,
    uri: "https://inkythuatso.com/uploads/thumbnails/800/2022/03/79d31e406fe3d3d7322b18666184911d-29-10-39-38.jpg",
  },
];
const Profile = ({ navigation }) => {
  const { idUser, isAuth, userData, setRefreshUser, setNameUser } = useAuth();
  const [infoUser, setInfoUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(String(userData.phone));
  const [email, setEmail] = useState(userData.email);
  const [image, setImage] = useState(userData.image);
  const [username, setUsername] = useState(userData.username);
  const [password, setPassword] = useState(userData.password);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isUpdateInformation, setIsUpdateInformation] = useState(false);

  const handleImageSelect = (selectedImage) => {
    setModalVisible(false);
    setImage(selectedImage.uri);
  };
  useEffect(() => {
    if (isAuth) {
      fetch(`https://travel-app-tau-jet.vercel.app/user/${idUser}`)
        .then((res) => res.json())
        .then((json) => {
          setInfoUser(json);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(true);
        });
    }
  }, [isAuth]);
  // const handlePhoneChange = (text) => {
  //   if (phone !== null || !isFirstTime) {
  //     setPhone(text);
  //   } else {
  //     setPhone("");
  //   }
  //   if (isFirstTime) {
  //     setIsFirstTime(false);
  //   }
  // };
  const handleUpdateInfo = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/user/${idUser}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone: parseInt(phone),
        email,
        image,
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setInfoUser(json);

        setIsUpdateInformation(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setNameUser(name);
  };

  const closeModal = () => {
    setIsUpdateInformation(false);
    setRefreshUser((prev) => prev + 1);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeightSpacer height={30} />
      <AppBar
        top={40}
        left={20}
        right={20}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />
      {isAuth ? (
        isLoading ? (
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
              <TouchableOpacity
                style={{
                  marginTop: 12,
                  backgroundColor: COLORS.lightBlue,
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 8,
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text style={{ color: COLORS.white }}>Select avatar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Phone:</Text>
              <TextInput
                style={styles.input}
                // value={phone === null || phone === undefined ? " " : phone}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                // keyboardType="numeric"
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.title}>Username:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>Password:</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={styles.btn}>
              <ReusableBtn
                btnText="Update Information"
                onPress={handleUpdateInfo}
                backgroundColor={COLORS.green}
                textColor={COLORS.white}
              />
            </View>
          </View>
        ) : null
      ) : (
        <View style={styles.signin}>
          <View>
            <View style={styles.signinOverlay}>
              <ReusableBtn
                onPress={() => navigation.navigate("Authentications")}
                btnText={"SIGN UP/LOG IN "}
                textColor={COLORS.white}
                backgroundColor={COLORS.blueFacilities}
                width={200}
              />
            </View>
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <FlatList
            numColumns={2}
            data={imageList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleImageSelect(item)}>
                <Image
                  style={{ width: 80, height: 80, margin: 10 }}
                  source={{ uri: item.uri }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUpdateInformation}
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
};

export default Profile;
