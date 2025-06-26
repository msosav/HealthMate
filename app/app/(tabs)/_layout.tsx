import { Tabs } from "expo-router";
import * as React from "react";
import { Platform } from "react-native";

import HapticTab from "@/app/components/HapticTab";
import { FontAwesome5 } from "@expo/vector-icons";

import { tintColorActive, tintColorInactive } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopWidth: 0, // Remove top border
            shadowOpacity: 0, // Remove shadow on iOS
            backgroundColor: "white", // Optional: keep transparent if you want blur
          },
          android: {
            elevation: 0, // Remove shadow on Android
            borderTopWidth: 0, // Remove top border
          },
          default: {
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
        tabBarActiveTintColor: tintColorActive,
        tabBarInactiveTintColor: tintColorInactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={28} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          title: "Exams",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="flask" size={28} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-alt" size={28} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="crises"
        options={{
          title: "Crises",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="briefcase-medical"
              size={28}
              color={color}
              solid
            />
          ),
        }}
      />
    </Tabs>
  );
}
