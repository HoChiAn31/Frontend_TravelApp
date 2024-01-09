import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, ReusableBtn } from "../../components";
import ReusableFavorite from "../../components/Reusable/ReusableFavorite";
import styles from "./favorite.style";
import { COLORS } from "../../constants/theme";
import { removeAllProduct } from "./FavoriteStore";
import { useAuth } from "../../components/Provider/AuthProvider";
import { toggleFavorite, toggleFavoriteList } from "./FavoriteStore";
import { useFavorite } from "../../components/Provider/FavoriteProvider";
const Favorite = ({ navigation }) => {
  const { isAuth, idUser } = useAuth();
  const { setQuantityFavorite } = useFavorite();
  const dispatch = useDispatch();
  // const [favorites, setFavorites] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [hotelFavorites, setHotelFavorites] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteData, setFavoriteData] = useState([]);

  const favorite = useSelector((state) => state.favorite.items);
  useEffect(() => {
    setQuantityFavorite(favorite.length);
  }, [favorite.length]);
  useEffect(() => {
    fetch(`https://travel-app-tau-jet.vercel.app/hotel`)
      .then((response) => response.json())
      .then((json) => {
        setHotelData(json);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log("error", error);
        setIsLoading(false);
      });
  });

  useEffect(() => {
    const hotelId = hotelData.filter((hotels) => favorite.includes(hotels._id));
    setHotelFavorites(hotelId);
  }, [isLoading, favorite]);
  const renderEmpty = () => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>Favorites list is empty!</Text>
      </View>
    );
  };
  const trashAllProduct = () => {
    if (favorite.length !== 0) {
      Alert.alert("Thông báo !", "Bạn có chắc chắn muốn xoá tất cả ?", [
        {
          text: "Huỷ",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            dispatch(removeAllProduct());
          },
        },
      ]);
    } else {
      alert("Chưa có sản phẩm nào !!!");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 50 }}>
        {isAuth ? (
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"Favorite"}
            color={COLORS.white}
            iconTrash
            color1={COLORS.white}
            onPress={() => navigation.goBack()}
            onPress1={trashAllProduct}
          />
        ) : (
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"Favorite"}
            color={COLORS.white}
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
      {isAuth ? (
        isLoading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{ paddingTop: 20 }}>
            <FlatList
              data={hotelFavorites}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <ReusableFavorite
                    item={item}
                    onPress={() =>
                      navigation.navigate("HotelDetails", { item })
                    }
                  />
                </View>
              )}
              ListEmptyComponent={renderEmpty}
            />
          </View>
        )
      ) : (
        <View style={styles.login}>
          <View style={styles.loginOverlay}>
            <ReusableBtn
              onPress={() => navigation.navigate("Authentications")}
              btnText={"SIGN UP/ LOG IN"}
              textColor={COLORS.white}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favorite;
