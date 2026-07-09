import { View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../global.css";

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      <Slot />
    </View>
  )
};

export default RootLayout;