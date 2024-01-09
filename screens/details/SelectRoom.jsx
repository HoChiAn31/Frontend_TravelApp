import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { AppBar } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { useAuth } from "../../components/Provider/AuthProvider";
import RoomFilter from "../../components/Room/RoomFilter";
import RoomList from "../../components/Room/RoomList";

const SelectRoom = ({ navigation }) => {
  const { isAuth } = useAuth();
  const route = useRoute();
  const { item } = route.params;
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  useEffect(() => {
    fetch(
      `https://travel-app-tau-jet.vercel.app/room/caterorieshotel/${item._id}`
    )
      .then((res) => res.json())
      .then((json) => {
        setRoomData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleFilterChange = ({ type, checkInDate, checkOutDate }) => {
    if (!checkInDate || !checkOutDate) {
      Alert.alert(
        "Please select a date",
        "",
        [{ text: "Cancel", style: "cancel" }],
        {
          cancelable: false,
        }
      );
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const formattedCheckIn = checkIn.toISOString().split("T")[0];
    const formattedCheckOut = checkOut.toISOString().split("T")[0];
    const filteredResult = roomData.filter((room) => {
      const isAvailable = room.availability.some((date) => {
        return date >= formattedCheckIn && date <= formattedCheckOut;
      });

      return !isAvailable && type.includes(room.type);
    });

    setFilteredRooms(filteredResult);
    setCheckInDate(formattedCheckIn);
    setCheckOutDate(formattedCheckOut);
    setIsFilter(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 100 }}>
        <AppBar
          top={50}
          left={20}
          right={20}
          title={"Select Room"}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
        />
      </View>

      {loading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View
          style={{
            marginBottom: 24,
          }}
        >
          <RoomFilter onFilterChange={handleFilterChange} />
          {isFilter ? (
            <RoomList
              rooms={filteredRooms.length > 0 ? filteredRooms : null}
              navigation={navigation}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

export default SelectRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  tile: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  btnStyle: {
    margin: 10,
    alignItems: "center",
  },
});
