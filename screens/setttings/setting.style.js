import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 12,
  },
  header: {
    height: 50,
  },

  // Feedback
  feedbackContainer: {
    flex: 1,
  },
  feedbackWrapper: {
    paddingHorizontal: 12,
  },
  feedbackHeader: {
    height: 50,
  },
  feedbackInput: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderWidth: 0.5,
  },

  //help
  help: {
    marginHorizontal: 4,
    marginBottom: 24,
  },
});

export default styles;
