import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppBar, AssetImage } from "../../components";
import { SIZES } from "../../constants/theme";
import ResuablePayment from "../../components/Reusable/ReusablePayment";

const Payments = ({ navigation }) => {
  return (
    <SafeAreaView style={{}}>
      <View style={styles.header}>
        <AppBar
          top={10}
          left={10}
          right={0}
          title={"Payments"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={{ marginTop: 50 }}>
        <ResuablePayment
          title={"1. Visa"}
          imgPayment={require("../../assets/images/Visa.png")}
        />
        <ResuablePayment
          title={"2. Visa Card"}
          imgPayment={require("../../assets/images/visacard.png")}
        />
        <ResuablePayment
          title={"3. PayPal"}
          imgPayment={require("../../assets/images/PayPal.png")}
        />
        <ResuablePayment
          title={"4. Card"}
          imgPayment={require("../../assets/images/card.png")}
        />
        <ResuablePayment
          title={"5. Mastercard"}
          imgPayment={require("../../assets/images/Mastercard.png")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Payments;

const styles = StyleSheet.create({});
