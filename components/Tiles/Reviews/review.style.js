import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

const styles = StyleSheet.create({
  reviewBorder: {
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.lightGrey,
  },
  reviewDetail: {
    paddingHorizontal: 4,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: COLORS.lightGrey,
    borderRadius: 8,
  },
});

export default styles;
