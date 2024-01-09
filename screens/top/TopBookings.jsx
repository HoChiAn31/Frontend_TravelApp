import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReusableTile from "../../components/Reusable/ReusableTile";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import { AssetImage, ReusableBtn } from "../../components";
import ReusableTileBook from "../../components/Reusable/ReusableTileBook";
import { useAuth } from "../../components/Provider/AuthProvider";

const TopBookings = ({ navigation, book }) => {
  const { isAuth } = useAuth();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState();

  useEffect(() => {
    fetch("https://travel-app-tau-jet.vercel.app/hotel")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (book && !loading) {
      const bookIds = book.map((booking) => booking.hotel_id);
      const filteredBookList = books.filter((item) =>
        bookIds.includes(item._id)
      );

      const updatedBookList = filteredBookList
        .map((item) => {
          const correspondingBookings = book.filter(
            (booking) => booking.hotel_id === item._id
          );
          return correspondingBookings.map((correspondingBooking) => ({
            bookId: correspondingBooking._id,
            ...correspondingBooking,

            ...item,
          }));
        })
        .flat();

      setBookList(updatedBookList);
    }
  }, [book, loading, books]);

  const handleCancel = () => {
    Alert.alert(
      "Do you want to cancel your ticket?",
      "",
      [{ text: "Delete" }, { text: "Cancel" }],
      { cancelable: false }
    );
  };
  return (
    <View style={{ marginTop: 20, marginBottom: 90, marginHorizontal: 20 }}>
      {isAuth ? (
        bookList ? (
          <FlatList
            data={bookList}
            showVerticalScrollIndicator={false}
            keyExtractor={(item) => item.bookID}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: COLORS.lightWhite,
                  marginBottom: 10,
                  borderRadius: 16,
                }}
              >
                <ReusableTile item={item} roomName paddingRight={80} />
                <View
                  style={[
                    reusable.rowWithSpace("space-between"),
                    { margin: 10 },
                  ]}
                >
                  <ReusableBtn
                    onPress={() => navigation.navigate("BillDetails", { item })}
                    btnText={"Details"}
                    width={"100%"}
                    backgroundColor={COLORS.white}
                    borderColor={COLORS.blue}
                    borderWidth={0.5}
                    textColor={COLORS.blue}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={{ textAlign: "center" }}>There are no seats booked</Text>
        )
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 180,
            fontSize: SIZES.medium,
          }}
        >
          Please log in for a better experience
        </Text>
      )}
    </View>
  );
};

export default TopBookings;

const styles = StyleSheet.create({});
