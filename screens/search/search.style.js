import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    borderColor: COLORS.blue,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.small,
    height: 50,
  },
  input: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  searchImage: {
    resizeMode: "contain",
    width: "100%",
    height: SIZES.height / 2.2,
    paddingHorizontal: 20,
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.lightBlue
  },
  filter: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tile: {
    marginHorizontal: 12,
    marginBottom: 10,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default styles;
