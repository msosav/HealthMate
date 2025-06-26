import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { Calendar, DateData } from "react-native-calendars";

export default function AppointmentsScreen() {
  // Mock data: Replace with your real data source
  const events: Record<string, number> = {
    "2025-06-26": 2,
    "2025-06-27": 1,
    "2025-06-29": 3,
  };

  // Prepare markedDates for Calendar
  const markedDates = Object.fromEntries(
    Object.entries(events).map(([date, count]) => [
      date,
      {
        marked: true,
        dotColor: "#007AFF",
        customStyles: {
          container: { backgroundColor: "#e0e7ff" },
          text: { color: "#1e293b" },
        },
        // Add a custom property for event count
        eventCount: count,
      },
    ])
  );

  const [selected, setSelected] = useState("");

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView className="p-8 bg-white">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-4xl text-primary font-bold">
            My appointments
          </Text>
          <Pressable
            onPress={() => {}}
            hitSlop={10}
            className="bg-primary text-white w-1/5 rounded-lg py-2 px-6 mt-2"
          >
            <Text className="text-white font-bold text-center">
              <FontAwesome5 name="plus" size={24} color="white" />
            </Text>
          </Pressable>
        </View>
        <Calendar
          markedDates={{
            ...markedDates,
            ...(selected && {
              [selected]: {
                ...(markedDates[selected] || {}),
                selected: true,
                selectedColor: "#007AFF",
              },
            }),
          }}
          markingType="custom"
          style={{
            height: 400,
          }}
          onDayPress={(day: DateData) => setSelected(day.dateString)}
          dayComponent={({ date, state }) => {
            const eventCount = date?.dateString
              ? events[date.dateString]
              : undefined;
            return (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color:
                      state === "disabled"
                        ? "#d1d5db"
                        : selected === date?.dateString
                        ? "#fff"
                        : "#1e293b",
                    backgroundColor:
                      selected === date?.dateString ? "#007AFF" : undefined,
                    borderRadius: 16,
                    padding: 4,
                    minWidth: 32,
                    textAlign: "center",
                  }}
                >
                  {date?.day}
                </Text>
                {eventCount && (
                  <View
                    style={{
                      backgroundColor: "#f59e42",
                      borderRadius: 8,
                      paddingHorizontal: 6,
                      marginTop: 2,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      +{eventCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        />
        <View>
          {/* You can show the list of appointments for the selected day here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
