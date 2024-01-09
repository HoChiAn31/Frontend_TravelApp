import {
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import AppBar from "../../components/Reusable/AppBar";
import { COLORS } from "../../constants/theme";
import { ReusableBtn, ReviewsList } from "../../components";
import { useAuth } from "../../components/Provider/AuthProvider";

const ReviewList = ({ navigation }) => {
  const route = useRoute();
  const { item, fetchReview, refreshUser } = route.params;
  const { isAuth, idUser } = useAuth();
  const [reviewData, setReviewData] = useState();
  const [reviewDataId, setReviewDataId] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState();
  const [rating, setRating] = useState(4);
  useEffect(() => {
    fetch(`https://travel-app-tau-jet.vercel.app/review/hotel/${item._id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json && json.length > 0 && json[0].user) {
          const sortedReviews = json[0].user.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );

          setReviewData(sortedReviews);
        }
        setReviewDataId(json[0]._id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    fetch(`https://travel-app-tau-jet.vercel.app/user/${idUser}`)
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  }, [refreshUser]);
  useEffect(() => {
    // Khi quay trở lại từ màn hình đánh giá, kiểm tra có cần refresh không
    if (route.params?.refresh) {
      route.params.refresh();
    }
  }, [route.params?.refresh]);
  const handleChangeComment = (comment) => {
    setContent(comment);
  };
  const handleRating = (rating) => {
    setRating(rating);
  };
  const handleComment = () => {
    if (content) {
      if (isAuth) {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
        const year = currentDate.getFullYear();
        const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }`;
        const newComment = {
          user_id: user._id,
          name: user.name,
          image: user.image,
          content,
          rating,
          date: formattedDate,
        };
        setReviewData((prevReviewData) => {
          const updateReviewList = [newComment, ...prevReviewData];
          const updatedReviewData = [...prevReviewData, newComment];
          fetch(
            `https://travel-app-tau-jet.vercel.app/review/${reviewDataId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user: updatedReviewData }),
            }
          )
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("reviewData: ", reviewData);

          return updateReviewList;
        });
        setContent("");
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
    } else {
      Alert.alert(
        "Please enter your comment",
        "",
        [{ text: "Cancel", style: "cancel" }],
        { cancelable: false }
      );
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 12, backgroundColor: "#fff" }}
      >
        <View style={{ height: 50 }}>
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"Review"}
            color={COLORS.white}
            icon={"search1"}
            color1={COLORS.white}
            onPress={() => {
              fetchReview();
              navigation.goBack();
            }}
          />
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={{ paddingTop: 20 }}>
            <ReviewsList reviews={reviewData} reviewDetail />
          </View>
        )}
        <View style={{}}>
          <View
            style={{
              color: COLORS.lightGrey,
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 16,
              borderRadius: 6,
              borderColor: COLORS.lightGrey,
              // marginBottom: 12,
            }}
          >
            <TextInput
              placeholder="Please comment about our hotel"
              placeholderTextColor={COLORS.black}
              value={content}
              onChangeText={handleChangeComment}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={{}}>
            <Rating
              type="custom"
              ratingCount={5}
              imageSize={36}
              // ratingColor="#3498db"
              defaultRating={4}
              style={{ paddingVertical: 12 }}
              onFinishRating={handleRating}
            />
          </View>
          <ReusableBtn
            btnText="Comment"
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            textColor={COLORS.white}
            onPress={handleComment}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default ReviewList;
