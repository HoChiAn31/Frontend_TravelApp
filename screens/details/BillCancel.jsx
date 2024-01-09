import { TextInput } from "react-native-paper";
import { AppBar, ReusableBtn } from "../../components";
import { COLORS } from "../../constants/theme";
import { Alert, SafeAreaView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { eachDayOfInterval, format } from "date-fns";
import { useEffect, useState } from "react";

function BillCancel({ navigation }) {
  const route = useRoute();
  const { item } = route.params;
  console.log(`https://travel-app-tau-jet.vercel.app/book/${item.bookId}`);
  const [roomData, setRoomData] = useState();
  const [updateRoom, setUpdateRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckUpdateRoom, setIsCheckUpdateRoom] = useState(false);
  const [isCheckDeleteRoom, setIsCheckDeleteRoom] = useState(false);
  //   console.log("item: ", item);
  useEffect(() => {
    fetch(`https://travel-app-tau-jet.vercel.app/room/${item.room_id}`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("roomID: ", json.availability);
        setRoomData(json.availability);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [item]);
  const checkInDate = new Date(item.CheckInDate);
  const checkOutDate = new Date(item.CheckOutDate);
  const daysInRange = eachDayOfInterval({
    start: checkInDate,
    end: checkOutDate,
  });
  const formattedDays = daysInRange.map((day) => format(day, "yyyy-MM-dd"));
  useEffect(() => {
    if (roomData) {
      const updatedAvailability = roomData.filter(
        (date) => !formattedDays.includes(date)
      );
      setUpdateRoom(updatedAvailability);
    }
  }, [roomData]);
  console.log("updateRoom: ", updateRoom);

  const handleupdateRoom = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/room/${item.room_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availability: updateRoom,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // setIsCheckUpdateRoom(true);
      })
      .catch((err) => {
        console.log("err1:" + err);
        // setIsCheckUpdateRoom(false);
      });
  };
  //   console.log(item.bookID);
  const handleDeleteBook = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/book/${item.bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        navigation.navigate("SuccessCancel");
      })
      .catch((err) => {
        // console.log("err2:" + err);
        navigation.navigate("SuccessCancel");
      });
  };
  const handleCancel = () => {
    handleupdateRoom();
    handleDeleteBook();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 12 }}>
        <View style={{ height: 50 }}>
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"Cancel Booking"}
            // color={COLORS.white}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        {isLoading ? null : (
          <View style={{}}>
            <View style={{}}>
              <TextInput
                placeholder="Enter the reason for canceling the booking"
                placeholderTextColor={COLORS.black}
                style={{ backgroundColor: COLORS.white }}
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <ReusableBtn
                onPress={handleCancel}
                btnText={"Cancel"}
                width={"100%"}
                backgroundColor={COLORS.white}
                borderColor={COLORS.blue}
                borderWidth={0.5}
                textColor={COLORS.blue}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default BillCancel;
