import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  SafeAreaView,
  Text,
} from "react-native";

import React = require("react");
import QuickAccessCard from "@/app/components/Home/QuickAccessCard";
import UpcommingAppointmentsCard from "@/app/components/Home/UpcommingAppointmentsCard";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView className="p-8 bg-white">
        <View>
          <Text className="text-5xl text-primary">Welcome back,</Text>
          <Text className="text-5xl font-bold text-primary">Miguel</Text>
        </View>
        <View className="mt-8">
          <Text className="text-2xl text-primary">Quick Actions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
          >
            <QuickAccessCard
              iconName="flask"
              info={{
                label: "New exam",
                type: "exam",
              }}
              squareColor="bg-secondary"
              circleColor="bg-tertiary"
              iconColor="#fff"
            />
            <QuickAccessCard
              iconName="calendar-alt"
              info={{
                label: "New appointment",
                type: "appointment",
              }}
              squareColor="bg-secondary"
              circleColor="bg-tertiary"
              iconColor="#fff"
            />
            <QuickAccessCard
              iconName="briefcase-medical"
              info={{
                label: "New crisis",
                type: "crisis",
              }}
              squareColor="bg-secondary"
              circleColor="bg-tertiary"
              iconColor="#fff"
            />
          </ScrollView>
        </View>
        <View className="mt-8">
          <Text className="text-2xl text-primary">Upcomming appointments</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
          >
            <UpcommingAppointmentsCard
              squareColor="bg-tertiary"
              name="Blood Test"
              date="Tuesday, April 17"
              time="2:30 pm"
              location="Main Hospital, Room 101"
            />
            <UpcommingAppointmentsCard
              squareColor="bg-tertiary"
              name="Blood Test"
              date="Tuesday, April 17"
              time="2:30 pm"
              location="Main Hospital, Room 101"
            />
            <UpcommingAppointmentsCard
              squareColor="bg-tertiary"
              name="Blood Test"
              date="Tuesday, April 17"
              time="2:30 pm"
              location="Main Hospital, Room 101"
            />
          </ScrollView>
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
