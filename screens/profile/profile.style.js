import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  item: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    // flex: 1,
  },
  btn: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  // Signin/Logout
  signin: {
    flex: 1,
    justifyContent: "center",
  },
  signinOverlay: {
    alignItems: "center",
  },
  // Modal
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 35,
    paddingHorizontal: 30,
    paddingVertical: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
