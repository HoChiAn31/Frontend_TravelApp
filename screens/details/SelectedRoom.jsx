import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  NetworkImage,
  Rating,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import reusable from "../../components/Reusable/reusable.style";
import { useAuth } from "../../components/Provider/AuthProvider";
const SelectedRoom = ({ navigation }) => {
  const { idUser, nameUser } = useAuth();
  const route = useRoute();
  const { item, checkInDate, checkOutDate } = route.params;
  const [totalAmount, setTotalAmount] = useState(0);
  const checkInDates = new Date(checkInDate);
  const checkOutDates = new Date(checkOutDate);
  const timeDifference = checkOutDates - checkInDates;
  const [dateList, setDateList] = useState([]);
  const [checkpost, setCheckPost] = useState(false);
  const [checkUpDateRoom, setCheckUpDateRoom] = useState(false);

  // Chuyển đổi số mili giây thành số ngày
  const numberOfDays = timeDifference / (1000 * 60 * 60 * 24) + 1;

  useEffect(() => {
    const newTotalAmount = item.price * numberOfDays;
    setTotalAmount(newTotalAmount);
  }, [numberOfDays]);
  useEffect(() => {
    const generateDateList = () => {
      const startDate = moment(checkInDate);
      const endDate = moment(checkOutDate);

      const days = [];
      let currentDate = startDate;

      while (currentDate.isSameOrBefore(endDate)) {
        days.push(currentDate.format("YYYY-MM-DD"));
        currentDate.add(1, "days");
      }

      setDateList(days);
    };

    generateDateList();
  }, [checkInDate, checkOutDate]);
  console.log("item.availability : ", item.availability);
  console.log("dateList: ", dateList);
  const postBook = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: idUser,
        hotel_id: item.hotel_id,
        hotel_name: item.hotel_name,
        room_id: item._id,
        room_name: item.room_name,
        CheckInDate: checkInDate,
        CheckOutDate: checkOutDate,
        TotalAmount: totalAmount,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json: ", json);
        navigation.navigate("Success", { item });
        setCheckPost(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateroom = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/room/${item._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        availability: [...item.availability, ...dateList],
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json: ", json);
        setCheckUpDateRoom(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBookNow = () => {
    updateroom();
    postBook();
  };

  return (
    <View>
      <ScrollView>
        <View style={{ height: 100 }}>
          <AppBar
            top={50}
            left={20}
            right={20}
            title={item.title}
            color={COLORS.white}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{ backgroundColor: COLORS.lightWhite, borderRadius: 16 }}
          >
            <NetworkImage
              source={item.image}
              width={"100%"}
              height={200}
              radius={16}
            />

            <HeightSpacer height={20} />

            <View style={{ marginHorizontal: 10 }}>
              <View style={reusable.rowWithSpace("space-between")}>
                <ReusableText
                  text={item.title}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <View style={reusable.rowWithSpace("flex-start")}>
                  <Rating rating={item.rating} />

                  <WidthSpacer width={10} />

                  <ReusableText
                    text={`(${item.review} views)`}
                    family={"regular"}
                    size={SIZES.medium}
                    color={COLORS.gray}
                  />
                </View>
              </View>

              <HeightSpacer height={10} />

              <ReusableText
                text={item.location}
                family={"medium"}
                size={SIZES.medium}
                color={COLORS.gray}
              />

              <View
                style={{
                  borderWidth: 0.5,
                  borderColor: COLORS.lightGrey,
                  marginVertical: 15,
                }}
              ></View>

              <ReusableText
                text={"Room Requirements"}
                family={"regular"}
                size={SIZES.medium}
                color={COLORS.black}
              />

              <HeightSpacer height={30} />
              <View style={reusable.rowWithSpace("space-between")}>
                <ReusableText
                  text={"Price per night"}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />

                <ReusableText
                  text={`$ ${item.price * numberOfDays}`}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
              </View>

              <HeightSpacer height={15} />

              <View style={reusable.rowWithSpace("space-between")}>
                <ReusableText
                  text={"Payment Method"}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <View style={reusable.rowWithSpace("flex-start")}>
                  <AssetImage
                    mode={"contain"}
                    width={30}
                    height={20}
                    data={require("../../assets/images/Visa.png")}
                  />
                  <ReusableText
                    text={"Visa"}
                    family={"regular"}
                    size={SIZES.medium}
                    color={COLORS.black}
                  />
                </View>
              </View>

              <HeightSpacer height={15} />

              <View style={{ marginBottom: 30 }}>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{}}>Check In Date: </Text>
                    <Text>{checkInDate}</Text>
                  </View>
                  <HeightSpacer height={15} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{}}>Check Out Date: </Text>
                    <Text>{checkOutDate}</Text>
                  </View>
                </View>
              </View>

              <View style={reusable.rowWithSpace("space-between")}>
                <ReusableText
                  text={"Total Price:"}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
                <ReusableText
                  text={`$ ${totalAmount}`}
                  family={"regular"}
                  size={SIZES.medium}
                  color={COLORS.black}
                />
              </View>

              <HeightSpacer height={30} />

              <ReusableBtn
                // onPress={() => navigation.navigate("Success", { item })}
                onPress={handleBookNow}
                btnText={"Book Now"}
                width={SIZES.width - 50}
                backgroundColor={COLORS.green}
                borderColor={COLORS.green}
                borderWidth={0}
                textColor={COLORS.white}
              />

              <HeightSpacer height={30} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectedRoom;
