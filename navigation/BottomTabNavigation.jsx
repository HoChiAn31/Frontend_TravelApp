import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  Profile,
  Chat,
  Location,
  Successful,
  Failed,
  Locations,
  Favorite,
  Management,
} from "../screens";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import TopTab from "./TopTab";
import AuthTopTab from "./AuthTopTab";
import { useFavorite } from "../components/Provider/FavoriteProvider";
import { useAuth } from "../components/Provider/AuthProvider";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 20,
  borderRadius: 20,
  height: 80,
  position: "absolute",
  bottom: 20,
  left: 20,
  right: 20,
};

const BottomTabNavigation = () => {
  const { isAuth, isAdmin } = useAuth();
  const { quantityFavorite } = useFavorite();
  const [badgeValue, setBadgeValue] = useState(null);
  useEffect(() => {
    setBadgeValue(
      isAuth ? (quantityFavorite === 0 ? null : quantityFavorite) : null
    );
  }, [isAuth, quantityFavorite]);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#EB6A58"
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 48 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Location"
        component={Locations}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "location" : "location-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />
      {isAdmin ? (
        <Tab.Screen
          name="Management"
          component={Management}
          options={{
            tabBarStyle: tabBarStyle,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={24}
                color="black"
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarBadge: badgeValue,

            tabBarStyle: tabBarStyle,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "heart-sharp" : "heart-outline"}
                color={focused ? COLORS.red : COLORS.gray}
                size={26}
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={TopTab}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? COLORS.red : COLORS.gray}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
