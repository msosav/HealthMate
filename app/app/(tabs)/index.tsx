import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
} from "react-native";

import React = require("react");
import { CustomText } from "@/components/CustomText";
import { mainColor } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? 24 : 0,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          backgroundColor: "#fff",
        }}
      >
        <View style={styles.titleContainer}>
          <CustomText style={{ fontSize: 32, flexShrink: 1 }} color={mainColor}>
            Welcome back,
          </CustomText>
          <CustomText
            style={{ fontSize: 32, fontWeight: "bold", flexShrink: 1 }}
            color={mainColor}
          >
            Miguel
          </CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%", // ensure full width
    gap: 0,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
