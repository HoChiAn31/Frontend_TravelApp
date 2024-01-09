import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import AssetImage from "./AssetImage";

function ReusableOption({ title, image, onPress, isActive }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text
        style={[
          { fontSize: SIZES.large },
          { color: isActive ? COLORS.blueFacilities : null },
        ]}
      >
        {title}
      </Text>
      <AssetImage data={image} mode={"contain"} width={50} height={40} />
    </TouchableOpacity>
  );
}

export default ReusableOption;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    paddingVertical: 12,
  },
});
