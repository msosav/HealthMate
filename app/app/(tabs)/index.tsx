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
import AppointmentsService from "@/app/services/appointments";

export default function HomeScreen() {
  const [monthlyAppointments, setMonthlyAppointments] = React.useState<any[]>(
    []
  );

  React.useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AppointmentsService.list();
        const data = response.data;
        const now = new Date();
        const thisMonth = now.getMonth() + 1;
        const thisYear = now.getFullYear();
        // Filter for appointments in the current month
        const filtered = data.filter((appt: any) => {
          if (!appt.date) return false;
          const [year, month] = appt.date.split("-").map(Number);
          return month === thisMonth && year === thisYear;
        });
        // Sort by date and time ascending
        filtered.sort((a: any, b: any) => {
          if (a.date !== b.date) return a.date.localeCompare(b.date);
          return (a.time || "").localeCompare(b.time || "");
        });
        setMonthlyAppointments(filtered);
      } catch (e) {
        setMonthlyAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  // Helper to format date as 'Friday, April 27' with capitalized weekday and month
  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    let formatted = d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    // Capitalize first letter of weekday and month
    formatted = formatted.replace(
      /^(\w)(\w+), (\w)(\w+)/,
      (m, a, b, c, d) => `${a.toUpperCase()}${b}, ${c.toUpperCase()}${d}`
    );
    return formatted;
  }
  // Helper to format time as 'h:mm a' or 'ha'
  function formatTime(timeStr: string) {
    if (!timeStr) return "";
    const [hourStr, minStr = "00"] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const min = parseInt(minStr, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    if (min === 0) {
      return `${hour}${ampm}`;
    } else {
      return `${hour}:${min.toString().padStart(2, "0")}${ampm}`;
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        className="p-8 bg-white"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
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
          <Text className="text-2xl text-primary">Appointments this month</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
          >
            {monthlyAppointments.length === 0 && (
              <Text className="text-base text-primary m-2">
                No appointments this month.
              </Text>
            )}
            {monthlyAppointments.map((appt, idx) => (
              <UpcommingAppointmentsCard
                key={appt.id || idx}
                squareColor="bg-tertiary"
                name={appt.name}
                date={formatDate(appt.date)}
                time={formatTime(appt.time)}
                location={appt.address}
              />
            ))}
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
