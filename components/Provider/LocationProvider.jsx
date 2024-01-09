import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
};
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coordinates, setCoordinates] = useState({});

  const [isoCountryCode, setIsoCountryCode] = useState(null);

  Location.setGoogleApiKey("AIzaSyATNluQbD2_fi0nOWOANg5l8ysamhYBAeU");

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Fetch ISO country code based on current location
      const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });

      // Extract ISO country code
      const currentIsoCountryCode =
        reverseGeocodedAddress[0]?.isoCountryCode || "Unknown";
      setIsoCountryCode(currentIsoCountryCode);
    };

    getLocation();
  }, []);
  // useEffect(() => {
  //   if (location) {
  //     setCoordinates({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //     });
  //   }
  // }, [location]);
  return (
    <LocationContext.Provider value={{ location, isoCountryCode }}>
      {children}
    </LocationContext.Provider>
  );
};
