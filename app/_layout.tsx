import { FontScalingProvider } from "@/contexts/FontScalingContext";
import { PackagesProvider } from "@/contexts/PackagesContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PackagesProvider>
      <FontScalingProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Dashboard",
              }}
            />
            <Stack.Screen
              name="package/[id]"
              options={{
                title: "Package Details",
              }}
            />
            <Stack.Screen
              name="update-status/[id]"
              options={{
                title: "Update Status",
              }}
            />
            <Stack.Screen
              name="settings"
              options={{
                title: "Settings",
              }}
            />
          </Stack>
        </View>
        <Toast />
      </FontScalingProvider>
    </PackagesProvider>
  );
}
