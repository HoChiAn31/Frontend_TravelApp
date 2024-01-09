import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  DescriptionText,
  HeightSpacer,
  HotelMap,
  NetworkImage,
  ReusableBtn,
  ReusableText,
  ReviewsList,
} from "../../components";
import { Rating } from "react-native-stock-star-rating";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";

import { COLORS, SIZES } from "../../constants/theme";
import styles from "./hotelDetails.style";
import reusable from "../../components/Reusable/reusable.style";
import ReusableFacilites from "../../components/Reusable/ReusableFacilites";
import ReusableIcon from "../../components/Reusable/ReusableIcon";
import { toggleFavorite } from "../Favourite/FavoriteStore";
import { useAuth } from "../../components/Provider/AuthProvider";
const HotelDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const { isAuth } = useAuth();
  const id = item._id;
  const [hotels, setHotels] = useState(item);
  const [reviewData, setReviewData] = useState();
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.items);
  const isFavorite = favorites.includes(id);
  const iconFavorite = isFavorite ? "heart" : "heart-o";
  const onFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  const fetchReview = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/review/hotel/${item._id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0 && json[0].user) {
          const sortedReviews = json[0].user.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          const latestComments = sortedReviews.slice(0, 2);
          setReviewData(latestComments);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const fetchRoom = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/room/hotel/${item._id}`)
      .then((res) => res.json())
      .then((json) => {
        setRoomData(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchReview();
  }, []);

  let coordinates = {
    id: hotels._id,
    title: hotels.title,
    latitude: hotels.coordinates[0].latitude,
    longitude: hotels.coordinates[0].longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView>
      <View style={{ height: 40 }}>
        <AppBar
          top={10}
          left={20}
          right={20}
          color={COLORS.white}
          // icon={"search1"}
          iconHeart={isAuth ? iconFavorite : null}
          // {isAuth ? iconHeart={iconFavorite}:null}
          colorIcon1={COLORS.red}
          onPress={() => navigation.goBack()}
          onPress1={isAuth ? onFavorite : null}
        />
      </View>

      <ScrollView>
        <View key={hotels._id}>
          <View style={styles.container}>
            <NetworkImage
              source={hotels.image}
              width={"100%"}
              height={220}
              radius={25}
            />

            <View style={styles.titleContainer}>
              <View style={styles.titleColumn}>
                <ReusableText
                  text={hotels.title}
                  family={"medium"}
                  size={SIZES.xLarge}
                  color={COLORS.black}
                  numberOfLines={1}
                />

                <HeightSpacer height={10} />
                <ReusableIcon
                  text={hotels.location}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.black}
                  icon={"location"}
                />

                <HeightSpacer height={10} />

                <View style={reusable.rowWithSpace("space-between")}>
                  <Rating
                    maxStars={5}
                    stars={hotels.rating}
                    bordered={false}
                    color={"#FD9942"}
                  />

                  <ReusableText
                    text={`(${hotels.review} Views)`}
                    family={"medium"}
                    size={SIZES.medium}
                    color={COLORS.gray}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* content */}
          <View style={[styles.container, { paddingTop: 90 }]}>
            <ReusableText
              text={"Facilities"}
              family={"medium"}
              size={SIZES.large}
              color={COLORS.black}
            />
            <View
              style={{
                flexDirection: "row",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReusableFacilites
                icon={"parking"}
                title={"Parking"}
                size={SIZES.small}
              />
              <ReusableFacilites
                icon={"restaurant"}
                title={"Restaurant"}
                size={SIZES.small}
              />
              <ReusableFacilites
                icon={"hours-24"}
                title={"24-Hours Front Desk"}
                size={SIZES.small}
              />
              <ReusableFacilites
                icon={"wifi"}
                title={"Wifi"}
                size={SIZES.small}
              />
              {/* </View> */}
            </View>
            <View style={reusable.rowWithSpace("space-between")}>
              <ReusableText
                text={"Reviews"}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.black}
              />

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ReviewList", {
                    item,
                    fetchReview,
                  })
                }
              >
                <Feather name="list" size={20} />
              </TouchableOpacity>
            </View>
            <HeightSpacer height={10} />
            <ReviewsList reviews={reviewData} />
          </View>
          <HeightSpacer height={10} />
          <View style={{ paddingHorizontal: 18 }}>
            <ReusableText
              text={"Location"}
              family={"medium"}
              size={SIZES.large}
              color={COLORS.black}
            />
            <HeightSpacer height={10} />

            <ReusableIcon
              text={hotels.location}
              family={"regular"}
              size={SIZES.small + 2}
              color={COLORS.gray}
              icon={"city"}
            />
            <HotelMap coordinates={coordinates} />
          </View>
          <HeightSpacer height={10} />
          <View style={{ paddingHorizontal: 18 }}>
            <ReusableText
              text={"Description"}
              family={"medium"}
              size={SIZES.large}
              color={COLORS.black}
            />
            <DescriptionText text={hotels.description} />
          </View>
          <HeightSpacer height={10} />

          <View style={{ paddingHorizontal: 18 }}>
            <View style={reusable.rowWithSpace("space-between")}>
              <ReusableText
                text={"Hotel Policy"}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.black}
              />
              <TouchableOpacity onPress={toggleModal}>
                <ReusableText
                  text={"See All"}
                  color={COLORS.blueFacilities}
                  size={SIZES.medium}
                />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontWeight: "bold",
                  fontFamily: "medium",
                  marginVertical: 8,
                }}
              >
                Children and extra bedsy
              </Text>
            </View>
            <View style={{ marginVertical: 8 }}>
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontWeight: "bold",
                  fontFamily: "medium",
                }}
              >
                Infant 0-1 year
              </Text>
              <Text>Stay for free if using existing bedding.</Text>
            </View>

            <View style={{ marginVertical: 8 }}>
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontWeight: "bold",
                  fontFamily: "medium",
                }}
              >
                Children 2-5 year
              </Text>
              <Text style={{}}>Stay for free if using existing bedding.</Text>
            </View>
            <View>
              <Text>Guests 6 years and older are considered as adults.</Text>
            </View>
          </View>
          <HeightSpacer height={15} />

          {/* <DescriptionText text={hotels.description} /> */}

          <View style={[reusable.rowWithSpace("space-between"), styles.bottom]}>
            <View>
              <ReusableText
                text={`\$ ${hotels.price}`}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.black}
              />
            </View>

            <ReusableBtn
              onPress={() => navigation.navigate("SelectRoom", { item })}
              btnText={"Select Room"}
              width={(SIZES.width - 50) / 2.2}
              backgroundColor={COLORS.blueFacilities}
              // borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        // onSwipeComplete={this.close}
        swipeDirection={["up", "left", "right", "down"]}
        onBackdropPress={toggleModal}
        backdropOpacity={0.7}
        style={styles.view}
      >
        <View style={{}}>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 40,
              borderRadius: 10,
            }}
          >
            {/* <Text>Your Modal Content</Text> */}

            <View style={styles.linebtn}>
              {/* <Text>Hotel Policy</Text> */}

              <ReusableText
                text={"Hotel Policy"}
                family={"medium"}
                size={SIZES.large}
                color={COLORS.black}
              />
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  // alignSelf: "flex-end",
                  // marginVertical: 10,
                  position: "absolute",
                  top: 10,
                  right: 32,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 16 }}>
              <Text
                style={{
                  fontSize: SIZES.medium,
                  fontWeight: "bold",
                  fontFamily: "medium",
                  marginVertical: 8,
                }}
              >
                Children and extra bedsy
              </Text>

              <View style={{ marginVertical: 8 }}>
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    fontWeight: "bold",
                    fontFamily: "medium",
                  }}
                >
                  Infant 0-1 year
                </Text>
                <Text>Stay for free if using existing bedding.</Text>
              </View>

              <View style={{ marginVertical: 8 }}>
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    fontWeight: "bold",
                    fontFamily: "medium",
                  }}
                >
                  Children 2-5 year
                </Text>
                <Text style={{}}>Stay for free if using existing bedding.</Text>
              </View>

              <Text>Guests 6 years and older are considered as adults.</Text>
              <HeightSpacer height={10} />
              <Text>
                Extra bed depends on the room type you choose, please check room
                information for more details.
              </Text>
              <HeightSpacer height={10} />
              <Text>
                When booking more than 5 rooms, additional policies and controls
                may apply.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HotelDetails;
