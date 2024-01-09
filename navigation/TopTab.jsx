import {
  View,
  Image,
  ActivityIndicator,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopBookings, TopInfo, TopTrips } from "../screens";
import { COLORS, SIZES } from "../constants/theme";
import {
  AppBar,
  AssetImage,
  HeightSpacer,
  NetworkImage,
  ReusableBtn,
  ReusableText,
} from "../components";
import styles from "./topTab.style";
import { useAuth } from "../components/Provider/AuthProvider";
import { useRefresh } from "../components/Provider/RefreshProvider";
import { useSelector } from "react-redux";
import { useFavorite } from "../components/Provider/FavoriteProvider";
const Tab = createMaterialTopTabNavigator();

const TopTab = ({ navigation }) => {
  const {
    isAuth,
    idUser,
    setAuthToken,
    setIdUser,
    setUserName,
    setPassWord,
    setIsAuth,
    setError,
    setUserData,
    refreshUser,
    setIsAdmin,
  } = useAuth();
  const { setQuantityFavorite } = useFavorite();
  const { refreshBooking } = useRefresh();
  const [user, setUser] = useState();
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [favoriteData, setFavoriteData] = useState([]);
  const favorite = useSelector((state) => state.favorite.items);
  useEffect(() => {
    if (idUser) {
      fetch(`https://travel-app-tau-jet.vercel.app/user/${idUser}`)
        .then((res) => res.json())
        .then((json) => {
          setUser(json);
          setUserData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

      fetch(`https://travel-app-tau-jet.vercel.app/book/categories/${idUser}`)
        .then((res) => res.json())
        .then((json) => {
          setBook(json);
          // console.log(json);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setLoading(false);
        });
    }
  }, [idUser, refreshBooking, refreshUser]);
  const fetchFavoriteData = () => {
    fetch(`https://travel-app-tau-jet.vercel.app/favorite`)
      .then((response) => response.json())
      .then((data) => setFavoriteData(data))
      .catch((err) => {});
  };
  const fecthFavorite = () => {
    const favoriteId = favoriteData.filter((favorite) =>
      favorite.userId.includes(idUser)
    );
    const isFavorite = favoriteId.length > 0;

    console.log("Is favorite: ", isFavorite);
    // setFavoriteDate(favoriteId);
    if (isFavorite) {
      const id = favoriteData[0]._id;
      console.log(id);
      fetch(`https://travel-app-tau-jet.vercel.app/favorite/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorite: favorite,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`https://travel-app-tau-jet.vercel.app/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: idUser,
          favorite: favorite,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLogOut = () => {
    // fetchFavoriteData();
    // fecthFavorite();
    setIsAuth(false);
    setAuthToken(null);
    setIdUser("");
    setUserName("");
    setPassWord("");
    setError(false);
    setIsAdmin(false);
  };
  return (
    <View style={{ flex: 1 }}>
      {!isAuth ? (
        <View style={{ backgroundColor: COLORS.lightWhite }}>
          <View>
            {/* <NetworkImage
              // source={
              //   "https://d326fntlu7tb1e.cloudfront.net/uploads/005cd529-6605-4bb9-8d8f-9475bf308f67-vinci0000.jpg"
              // }

              width={"100%"}
              height={300}
              radius={0}
            /> */}
            <AssetImage
              data={require("../assets/images/hotel4.png")}
              width={"100%"}
              height={300}
              radius={0}
              mode={"cover"}
            />

            <View style={styles.profile}>
              <View style={styles.name}>
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: COLORS.blueFacilities,
                    padding: 5,
                    borderRadius: 12,
                  }}
                >
                  <ReusableBtn
                    onPress={() => navigation.navigate("Authentications")}
                    btnText={"SIGN UP/ LOG IN"}
                    textColor={COLORS.white}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : loading ? (
        <View style={styles.horizontal}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{ backgroundColor: COLORS.lightWhite }}>
          <View>
            <NetworkImage
              source={
                "https://d326fntlu7tb1e.cloudfront.net/uploads/005cd529-6605-4bb9-8d8f-9475bf308f67-vinci0000.jpg"
              }
              width={"100%"}
              height={300}
              radius={0}
            />

            <AppBar
              top={40}
              left={10}
              right={20}
              hideIcon
              color={"transparent"}
              icon={"logout"}
              color1={COLORS.white}
              onPress1={handleLogOut}
            />

            <View style={styles.profile}>
              <Image
                // source={{
                //   uri: "https://d326fntlu7tb1e.cloudfront.net/uploads/c87b6dfb-ee4b-47fa-9c02-6ccca2893a6f-vinci_06.jpg",
                // }}
                source={{ uri: user.image }}
                style={styles.image}
              />

              <HeightSpacer height={5} />

              <View style={{ alignItems: "center" }}>
                <ReusableText
                  text={user.name}
                  family={"medium"}
                  size={SIZES.medium}
                  color={COLORS.white}
                />
              </View>

              <HeightSpacer height={5} />

              <View style={styles.name}>
                <View style={{ alignItems: "center" }}>
                  <ReusableText
                    text={user.email}
                    family={"medium"}
                    size={SIZES.medium}
                    color={COLORS.white}
                  />
                </View>
              </View>
            </View>
          </View>
          <StatusBar barStyle="light-content" />
        </View>
      )}

      {/* {!loading ? ( */}
      <Tab.Navigator>
        <Tab.Screen name="Bookings">
          {({ navigation }) => (
            <TopBookings navigation={navigation} book={book} />
          )}
        </Tab.Screen>
        {/* <Tab.Screen name="Bookings" component={TopBookings} /> */}
        {/* <Tab.Screen name="Trips" component={TopTrips} /> */}
        <Tab.Screen name="Info" component={TopInfo} />
      </Tab.Navigator>
      {/* ) : null} */}
      {/* <StatusBar barStyle="dark-content" /> */}
    </View>
  );
};

export default TopTab;
