import React from "react";
import { View, Text, FlatList, Image, StyleSheet, Alert } from "react-native";
import ReusableTileRoom from "../Reusable/ReusableTileRoom";
import ReusableBtn from "../Buttons/ReusableBtn";
import { COLORS, SIZES } from "../../constants/theme";
import { useAuth } from "../Provider/AuthProvider";

const RoomList = ({
  rooms,
  onPress,
  navigation,
  checkInDate,
  checkOutDate,
}) => {
  if (checkInDate && checkOutDate) {
    console.log("checkInDate: ", checkInDate);
    console.log("checkOutDate: ", checkOutDate);
  }
  const { isAuth } = useAuth();
  console.log("rooms: ", rooms);
  const handleSelectRoom = (item) => {
    if (isAuth) {
      const params = {
        item,
        checkInDate,
        checkOutDate,
      };
      navigation.navigate("SelectedRoom", params);
    } else {
      Alert.alert(
        "Please Log in",
        "",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            onPress: () => navigation.navigate("Authentications"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const renderSoldout = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require("../../assets/images/SoldOut.png")}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {rooms ? (
        <FlatList
          data={rooms}
          showVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.tileColumn}>
              <View style={styles.tile}>
                <ReusableTileRoom item={item} />

                <View style={styles.btnStyle}>
                  <ReusableBtn
                    onPress={() => handleSelectRoom(item)}
                    btnText={"Select Room"}
                    // width={SIZES.width - 50}
                    backgroundColor={COLORS.blueFacilities}
                    borderColor={COLORS.green}
                    borderWidth={0}
                    textColor={COLORS.white}
                  />
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        renderSoldout()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginHorizontal: 20,
    height: 540,
  },
  roomContainer: {
    marginBottom: 20,
  },
  roomImage: {
    width: "100%",
    height: 200,
    marginBottom: 8,
  },
  tileColumn: {
    marginBottom: 10,
  },
  btnStyle: {
    marginVertical: 8,
  },
});

export default RoomList;
