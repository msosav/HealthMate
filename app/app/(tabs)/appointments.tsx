import { mainColor, secondaryColor } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  SectionList,
  RefreshControl,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import AppointmentCard from "@/app/components/Appointments/AppointmentCard";
import NewAppointmentModal from "@/app/components/Appointments/NewAppointmentModal";
import AppointmentsService from "@/app/services/appointments";

export default function AppointmentsScreen() {
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [events, setEvents] = useState<Record<string, number>>({});
  const [visibleMonth, setVisibleMonth] = useState<number>(
    new Date().getMonth()
  );
  const [visibleYear, setVisibleYear] = useState<number>(
    new Date().getFullYear()
  );
  const [refreshing, setRefreshing] = useState(false);

  // Move fetchAppointments outside useEffect so it can be called elsewhere
  const fetchAppointments = async () => {
    try {
      const response = await AppointmentsService.list();
      const data = response.data;
      setAppointments(data);
      // Count events per date
      const eventCounts: Record<string, number> = {};
      data.forEach((appt: any) => {
        if (appt.date) {
          eventCounts[appt.date] = (eventCounts[appt.date] || 0) + 1;
        }
      });
      setEvents(eventCounts);
    } catch (error) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
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
        eventCount: count,
      },
    ])
  );

  // Group appointments by date and sort by time
  const groupedAppointments = React.useMemo(() => {
    const groups: { [date: string]: any[] } = {};
    appointments.forEach((appt) => {
      if (!groups[appt.date]) groups[appt.date] = [];
      groups[appt.date].push(appt);
    });
    // Sort each group by time
    Object.keys(groups).forEach((date) => {
      groups[date].sort((a, b) => (a.time > b.time ? 1 : -1));
    });
    // Convert to SectionList format
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => (dateA > dateB ? 1 : -1))
      .map(([date, data]) => {
        // Parse as UTC to avoid timezone offset
        const [year, month, day] = date.split("-").map(Number);
        const localDate = new Date(Date.UTC(year, month - 1, day + 1));
        return {
          title: localDate.toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
          }),
          data,
        };
      });
  }, [appointments]);

  // Only show appointments for the visible month/year
  const filteredGroupedAppointments = React.useMemo(() => {
    return groupedAppointments.filter((section) => {
      // Parse the date from the section title
      if (!section.data.length) return false;
      // Use the first appointment's date string (YYYY-MM-DD)
      const apptDate = section.data[0].date;
      const [year, month] = apptDate.split("-").map(Number);
      return month === visibleMonth + 1 && year === visibleYear;
    });
  }, [groupedAppointments, visibleMonth, visibleYear]);

  // Helper to format time as 'h:mm a' or 'ha'
  function formatTime(timeStr: string) {
    if (!timeStr) return "";
    // Accepts 'HH:mm' or 'HH:mm:ss'
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

  // Helper to format date as 'Friday, April 27'
  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        className="p-8 bg-white"
        style={{
          flex: 1,
          padding: 32,
          backgroundColor: "#fff",
          paddingBottom: 80,
        }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-4xl text-primary font-bold">
            My appointments
          </Text>
          <Pressable
            onPress={() => setModalVisible(true)}
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
                selectedColor: mainColor,
              },
            }),
          }}
          markingType="custom"
          style={{
            marginBottom: 16,
          }}
          onDayPress={(day: DateData) => setSelected(day.dateString)}
          onMonthChange={(monthObj) => {
            setVisibleMonth(monthObj.month - 1);
            setVisibleYear(monthObj.year);
          }}
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
                        ? secondaryColor
                        : selected === date?.dateString
                        ? "#fff"
                        : mainColor,
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
                      backgroundColor: secondaryColor,
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
        <SectionList
          sections={filteredGroupedAppointments}
          keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <Text className="text-2xl text-primary mt-4 mb-2">{title}</Text>
          )}
          renderItem={({ item }) => (
            <AppointmentCard
              info={{
                name: item.name,
                comments: item.comments,
                date: formatDate(item.date),
                time: formatTime(item.time),
                location: item.address,
              }}
            />
          )}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      <NewAppointmentModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          fetchAppointments();
        }}
      />
    </SafeAreaView>
  );
}
