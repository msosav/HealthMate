import * as React from "react";
import { SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // or use any icon library you prefer

import { mainColor } from "@/constants/Colors";

export function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={28} color={mainColor} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={32} color={mainColor} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    gap: 16,
    borderBottomWidth: 0, // Remove the bottom border
  },
});
