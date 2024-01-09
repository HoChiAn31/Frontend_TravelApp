import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusableBtn } from "../../components";
import { COLORS } from "../../constants/theme";
import { TextInput } from "react-native";
import styles from "./setting.style";
function Feedback({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"FeedBack"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <View>
          <View style={styles.feedbackInput}>
            <TextInput
              placeholder="Please send us your feedback"
              placeholderTextColor={COLORS.black}
              style={{ backgroundColor: COLORS.white }}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <ReusableBtn
              onPress={() => navigation.navigate("SuccessfulFeedback")}
              btnText={"Send Feedback"}
              width={"100%"}
              backgroundColor={COLORS.white}
              borderColor={COLORS.blue}
              borderWidth={0.5}
              textColor={COLORS.blue}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Feedback;
