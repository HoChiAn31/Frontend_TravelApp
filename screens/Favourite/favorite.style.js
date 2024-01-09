import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
  loginOverlay: {
    alignItems: "center",
    backgroundColor: COLORS.blueFacilities,
    padding: 5,
    borderRadius: 12,
  },
});

export default styles;
