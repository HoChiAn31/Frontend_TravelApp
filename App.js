import AppConent from "./AppConent";
import { AuthProvider } from "./components/Provider/AuthProvider";
import { LocationProvider } from "./components/Provider/LocationProvider";
import { LogBox, StatusBar } from "react-native";
import { RefreshProvider } from "./components/Provider/RefreshProvider";
import { Provider } from "react-redux";
import store from "./store";
import { FavoriteProvider } from "./components/Provider/FavoriteProvider";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <FavoriteProvider>
      <Provider store={store}>
        <AuthProvider>
          <LocationProvider>
            <RefreshProvider>
              <AppConent />
              <StatusBar barStyle="dark-content" />
            </RefreshProvider>
          </LocationProvider>
        </AuthProvider>
      </Provider>
    </FavoriteProvider>
  );
}
