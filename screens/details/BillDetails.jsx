import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { AppBar, NetworkImage, ReusableBtn } from "../../components";
import { COLORS } from "../../constants/theme";
import ReusableBill from "../../components/Reusable/ReusableBill";

const BillDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const checkInDate = new Date(item.CheckInDate);
  const checkOutDate = new Date(item.CheckOutDate);
  const formattedCheckinDate = checkInDate.toISOString().split("T")[0];
  const formattedCheckoutDate = checkOutDate.toISOString().split("T")[0];

  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        top={40}
        left={20}
        right={20}
        title={"Bill Details"}
        color={COLORS.white}
        onPress={() => navigation.goBack()}
      />
      <NetworkImage
        source={item.image}
        width={"100%"}
        height={200}
        radius={16}
      />
      <View
        style={{
          marginVertical: 16,
          backgroundColor: "#fff",
          borderRadius: 20,
          paddingHorizontal: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontSize: 18, width: "60%", fontWeight: "bold" }}>
            {item.hotel_name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              width: "40%",
              textAlign: "right",
              paddingRight: 24,
            }}
          >
            ${item.TotalAmount}
          </Text>
        </View>
        <ReusableBill title={"Ticket Code"} text={item.bookId} />
        <ReusableBill title={"Room"} text={item.room_name} />
        <ReusableBill title={"Location"} text={item.location} />
        <ReusableBill title={"Country"} text={item.country} />
        <View
          style={{
            paddingHorizontal: 4,
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ReusableBill
            title={"Check-in Date"}
            text={formattedCheckinDate}
            width
          />
          <ReusableBill
            title={"Check-out Date"}
            text={formattedCheckoutDate}
            width
          />
        </View>
      </View>
      <View>
        <ReusableBtn
          onPress={() => navigation.navigate("BillCancel", { item })}
          btnText={"Cancel"}
          // width={(SIZES.width - 50) / 2.2}
          width={"100%"}
          backgroundColor={COLORS.red}
          borderColor={COLORS.red}
          borderWidth={0}
          textColor={COLORS.white}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  overlay: {
    marginHorizontal: 12,
  },
  codeBill: {
    marginTop: 16,
    fontSize: 18,
  },
  hotelImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 18,
    // fontWeight: "bold",
    marginBottom: 5,
  },
  roomName: {
    fontSize: 18,
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 18,
    marginBottom: 5,
  },
  checkInDate: {
    fontSize: 18,
    marginBottom: 5,
  },
  checkOutDate: {
    fontSize: 18,
    marginBottom: 5,
  },
  bookingPrice: {
    fontSize: 18,
    // fontWeight: "bold",
  },
});

export default BillDetails;
