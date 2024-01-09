import { Text, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import AssetImage from "./AssetImage";

function ResuablePayment({ title, imgPayment }) {
  return (
    <View
      style={{
        // marginTop: 20,
        // borderBottomWidth: 0.5,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: SIZES.large }}>{title} </Text>
        <AssetImage mode={"contain"} width={50} height={40} data={imgPayment} />
      </View>
    </View>
  );
}

export default ResuablePayment;
