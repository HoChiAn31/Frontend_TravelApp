import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  AssetImage,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
} from "../../components";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import { useRefresh } from "../../components/Provider/RefreshProvider";

const SuccessfulCancel = ({ navigation }) => {
  // const router = useRoute();
  // const { item } = router.params;
  const { setRefreshBooking } = useRefresh();
  const handleDone = () => {
    setRefreshBooking((prev) => prev + 1);
    navigation.navigate("Bottom");
  };
  return (
    <View>
      <View style={{ marginTop: "40%" }}>
        <AssetImage
          data={require("../../assets/images/checked.png")}
          width={"100%"}
          height={200}
          mode={"contain"}
        />

        <HeightSpacer height={40} />

        <View style={{ alignItems: "center" }}>
          <ReusableText
            text={"Cancel Successful"}
            family={"medium"}
            size={TEXT.xLarge}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />

          <ReusableText
            text={"You can find your booking details below"}
            family={"regular"}
            size={SIZES.medium}
            color={COLORS.gray}
          />
          <HeightSpacer height={20} />
        </View>
        <View style={{ margin: 20 }}>
          <ReusableBtn
            onPress={handleDone}
            btnText={"Done"}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            borderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );
};

export default SuccessfulCancel;
