import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./location.style";
import { useLocation } from "../../components/Provider/LocationProvider";
const Locations = () => {
  const { location } = useLocation();
  console.log("Location:", location);
  const [coordinates, setCoordinates] = useState({});
  useEffect(() => {
    if (location) {
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      region={coordinates}
      style={styles.mapStyle}
    >
      <Marker coordinate={coordinates} title={"My Location"} />
    </MapView>
  );
};
export default Locations;
