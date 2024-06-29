import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from '../redux/store/store'
import { persistor } from '../redux/store/store'
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false}}/>
        </Stack>
      </PersistGate>
    </Provider>
  );
}
