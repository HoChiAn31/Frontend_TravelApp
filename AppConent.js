import { useFonts } from "expo-font";
import * as Splashscreen from "expo-splash-screen";
import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Onboarding,
  Search,
  CountryDetails,
  CountryList,
  Recommended,
  PlaceDetails,
  HotelDetails,
  BillDetails,
  HotelList,
  HotelSearch,
  SelectRoom,
  Payments,
  Settings,
  SelectedRoom,
  Successful,
  Failed,
  ReviewList,
  Profile,
  AuthTopTab,
  BillCancel,
  SuccessfulCancel,
  Feedback,
  PrivacyPolicy,
  TermsOfService,
  GetHelp,
  SuccessfulFeedback,
  NearByHotelList,
  MgPlace,
  AddPlace,
  EDPlace,
  AddLocation,
  MgLocation,
  EDLocation,
  MgHotel,
  AddHotel,
  EDHotel,
  PlaceList,
} from "./screens";
import BottomTabNavigation from "./navigation/BottomTabNavigation";

const Stack = createNativeStackNavigator();

export default function AppConent() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/regular.otf"),
    medium: require("./assets/fonts/medium.otf"),
    bold: require("./assets/fonts/bold.otf"),
    light: require("./assets/fonts/light.otf"),
    xtrabold: require("./assets/fonts/xtrabold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splashscreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboard"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bottom"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CountryList"
          component={CountryList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recommended"
          component={Recommended}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelDetails"
          component={HotelDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BillDetails"
          component={BillDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelList"
          component={HotelList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReviewList"
          component={ReviewList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelSearch"
          component={HotelSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectRoom"
          component={SelectRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profiles"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payments"
          component={Payments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Success"
          component={Successful}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SuccessCancel"
          component={SuccessfulCancel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fail"
          component={Failed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectedRoom"
          component={SelectedRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Authentications"
          component={AuthTopTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BillCancel"
          component={BillCancel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="feedback"
          component={Feedback}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfService}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetHelp"
          component={GetHelp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SuccessfulFeedback"
          component={SuccessfulFeedback}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NearByHotelList"
          component={NearByHotelList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MgPlace"
          component={MgPlace}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EDPlace"
          component={EDPlace}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MgLocation"
          component={MgLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddLocation"
          component={AddLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EDLocation"
          component={EDLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MgHotel"
          component={MgHotel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddHotel"
          component={AddHotel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EDHotel"
          component={EDHotel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlaceList"
          component={PlaceList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
