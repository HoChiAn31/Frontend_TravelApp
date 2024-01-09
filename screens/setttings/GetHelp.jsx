import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar } from "../../components";
import ReusablePolicy from "../../components/Reusable/ReusablePolicy";
import styles from "./setting.style";
import ReusableHelp from "../../components/Reusable/ReusableHelp";

function GetHelp({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <AppBar
            top={10}
            left={0}
            right={0}
            title={"Get Help"}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <ScrollView>
          <View style={styles.help}>
            <ReusableHelp
              title={
                "1. How can I get more information about the room or property's facility?"
              }
              text={
                "You can find details about the property in your confirmation email or on the property detail page. For anything else, you can also contact property directly."
              }
            />
            <ReusableHelp
              title={"2. When do I get a confirmation email?"}
              text={
                "In most cases, you will receive this email along with the booking voucher (PDF file) within 30 minutes of booking. If you still haven't received it after that time, please check your junk mail and/or spam filters. You can also download or resend your booking voucher online."
              }
            />
            <ReusableHelp
              title={"3. Can you resend the booking voucher to me?"}
              text={
                "Just by clicking on the self-service link provided in your confirmation email, you will be able to resend your booking voucher."
              }
            />
            <ReusableHelp
              title={"4. Can I add extra bed/baby cot in my room?"}
              text={
                "The availability of extra bed/baby cot depends on the property. Additional cost for children, including extra beds, are not included in the reservation price unless stated. Please contact the property directly for this information."
              }
            />
            <ReusableHelp
              title={"5. How can I cancel my booking?"}
              text={
                "You can cancel your booking online on the Agoda website or app. Any cancellation fees are determined by the property and listed in your cancellation policy."
              }
            />
            <ReusableHelp
              title={"6. Will I be charged if I cancel my booking?"}
              text={
                "If you have a free cancellation booking, you won't pay a cancellation fee. If your booking is no longer free to cancel or is non-refundable, you may incur a cancellation fee."
              }
            />
            <ReusableHelp
              title={"7. I want to change my booking dates. How can I do this?"}
              text={
                "Hotel now provides you with a self-service option. Select your booking and choose your new dates."
              }
            />
            <ReusableHelp
              title={"8. How can I make a special request?"}
              text={
                "You can send your special requests to the property using the self-service option. Please note that all special requests are subject to availability and cannot be guaranteed by Agoda."
              }
            />
            <ReusableHelp
              title={"9. How will I know if a special request is confirmed?"}
              text={
                "All special requests are subject to availability and cannot be guaranteed by Hotel. Hotel will forward your request to your preferred property upon receipt, and you can follow up with the property before or upon arrival."
              }
            />
            <ReusableHelp
              title={"10. Can I request early check-in/late check-out?"}
              text={
                "You can send your special request for an early check-in/late check-out using the self-service option. Please note that all special requests are subject to availability and cannot be guaranteed by Agoda."
              }
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default GetHelp;
