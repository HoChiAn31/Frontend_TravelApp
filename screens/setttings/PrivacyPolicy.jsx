import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusableBtn, ReusableText } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { TextInput } from "react-native";
import styles from "./setting.style";
import ReusablePolicy from "../../components/Reusable/ReusablePolicy";

function PrivacyPolicy({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"PrivacyPolicy"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <ScrollView>
          <View style={{}}>
            <ReusablePolicy
              title={"1. Information We Collect"}
              text={
                "We may collect information about you, such as your name, phone number, email address, and credit card details through your use of the Site."
              }
            />
            <ReusablePolicy
              title={"2. Use"}
              text={
                "We may use your information to provide the requested services, maintain and improve the Site, and send you marketing communications."
              }
            />
            <ReusablePolicy
              title={"3. Mobile Devices"}
              text={
                "With your consent, we may send you push notifications with information about your reservations and Agoda programs of your choosing."
              }
            />
            <ReusablePolicy
              title={"4. Sharing"}
              text={
                "We may share your information with suppliers, service providers, business partners, and our affiliates."
              }
            />
            <ReusablePolicy
              title={"5. Country-Specific Privacy Rights"}
              text={
                "Depending on your country of residence, you may have rights to request information from us including how we share certain categories of your information with third parties."
              }
            />
            <ReusablePolicy
              title={"6. Cookies"}
              text={
                "We may use cookies and similar technologies to help provide our Site, understand and customize your preferences, and display relevant advertising."
              }
            />
            <ReusablePolicy
              title={"7. International Transfers"}
              text={
                "We maintain appropriate protections for cross-border transfers as required by law for international data transfers."
              }
            />
            <ReusablePolicy
              title={"8. Additional Considerations"}
              text={
                "Information related to minors, policy language, and Terms of Use."
              }
            />
            <ReusablePolicy
              title={"9. Information from Other Partners"}
              text={
                "We may collect information from affiliated entities, business partners, or other third party providers and you may opt-out of this collection."
              }
            />
            <ReusablePolicy
              title={"10. Security"}
              text={
                "We maintain reasonable security measures to protect your information and require our service providers to do the same."
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default PrivacyPolicy;
