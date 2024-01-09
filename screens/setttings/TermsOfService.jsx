import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, ReusableBtn, ReusableText } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";
import { TextInput } from "react-native";
import ReusablePolicy from "../../components/Reusable/ReusablePolicy";
import styles from "./setting.style";

function TermsOfService({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"Terms Of Service"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <ScrollView>
          <View style={{}}>
            <ReusablePolicy
              title={"1. Reservation and Check-In"}
              text={
                "Guests must provide valid identification and credit card information to secure a reservation."
              }
            />
            <ReusablePolicy
              title={"2. Cancellation Policy"}
              text={
                "Cancellations made within 48 hours of the reservation date will incur a one-night charge. Non-refundable rates are subject to full charges."
              }
            />
            <ReusablePolicy
              title={"3. Payment"}
              text={
                "All charges must be settled upon check-out. The hotel accepts major credit cards. Cash payments require a valid credit card on file for incidentals."
              }
            />
            <ReusablePolicy
              title={"4. Room Occupancy"}
              text={
                "Rooms are designated for a specific number of guests. Additional occupants may incur extra charges. Children under 18 must be accompanied by an adult."
              }
            />
            <ReusablePolicy
              title={"5. Smoking and Pets"}
              text={
                "The hotel is a smoke-free environment. Smoking is prohibited in all indoor areas. Pets are not allowed, with exceptions made for service animals with proper documentation."
              }
            />
            <ReusablePolicy
              title={"6. Damage and Liability"}
              text={
                "Guests are responsible for any damage to hotel property. The hotel is not liable for loss of money, jewelry, or valuables. Room safes are provided for securing belongings."
              }
            />
            <ReusablePolicy
              title={"7. Quiet Hours"}
              text={
                "Guests are expected to respect quiet hours from 10:00 PM to 7:00 AM. Parties and excessive noise may result in eviction without refund."
              }
            />
            <ReusablePolicy
              title={"8. Facilities and Amenities"}
              text={
                "Guests may use hotel facilities and amenities responsibly. Misuse or damage may result in additional charges. Pool and fitness center hours are posted, and rules must be followed."
              }
            />
            <ReusablePolicy
              title={"9. Lost and Found"}
              text={
                "The hotel is not responsible for items left behind. Guests may contact the front desk to inquire about lost items. Unclaimed items will be donated or discarded after 30 days."
              }
            />
            <ReusablePolicy
              title={"10. Guest Conduct"}
              text={
                "The hotel reserves the right to refuse service to anyone for inappropriate behavior or violation of hotel policies. Disruptive guests may be asked to leave without refund."
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default TermsOfService;
